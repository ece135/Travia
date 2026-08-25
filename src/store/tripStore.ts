import { create } from 'zustand';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Place = {
  id: string;
  name: string;
  category: 'museum' | 'restaurant' | 'beach' | 'other';
};

type DayPlan = {
  id: string;
  date: string;
  note: string;
};

type Expense = {
  id: string;
  category: 'food' | 'shopping' | 'transport' | 'accommodation' | 'other';
  amount: number;
  note: string;
};

type Trip = {
  destination: string;
  startDate: string;
  endDate: string;
  places: Place[];
  dayPlans: DayPlan[];
  totalBudget: number;
  expenses: Expense[];
};

const TRIP_DOC_ID = 'current-trip'; // tek trip için sabit id, ileride hesap sistemiyle değişecek

type TripStore = {
  trip: Trip | null;
  loading: boolean;
  loadTrip: () => Promise<void>;
  createTrip: (destination: string, startDate: string, endDate: string) => Promise<void>;
  addPlace: (place: Place) => Promise<void>;
  addDayPlan: (plan: DayPlan) => Promise<void>;
  setTotalBudget: (amount: number) => Promise<void>;
  addExpense: (expense: Expense) => Promise<void>;
};

async function saveTrip(trip: Trip) {
  await setDoc(doc(db, 'trips', TRIP_DOC_ID), trip);
}

export const useTripStore = create<TripStore>((set, get) => ({
  trip: null,
  loading: false,

  loadTrip: async () => {
    set({ loading: true });
    const snap = await getDoc(doc(db, 'trips', TRIP_DOC_ID));
    if (snap.exists()) {
      set({ trip: snap.data() as Trip });
    }
    set({ loading: false });
  },

  createTrip: async (destination, startDate, endDate) => {
    const newTrip: Trip = { destination, startDate, endDate, places: [], dayPlans: [], totalBudget: 0, expenses: [] };
    set({ trip: newTrip });
    await saveTrip(newTrip);
  },

  addPlace: async (place) => {
    const trip = get().trip;
    if (!trip) return;
    const updated = { ...trip, places: [...trip.places, place] };
    set({ trip: updated });
    await saveTrip(updated);
  },

  addDayPlan: async (plan) => {
    const trip = get().trip;
    if (!trip) return;
    const updated = { ...trip, dayPlans: [...trip.dayPlans, plan] };
    set({ trip: updated });
    await saveTrip(updated);
  },

  setTotalBudget: async (amount) => {
    const trip = get().trip;
    if (!trip) return;
    const updated = { ...trip, totalBudget: amount };
    set({ trip: updated });
    await saveTrip(updated);
  },

  addExpense: async (expense) => {
    const trip = get().trip;
    if (!trip) return;
    const updated = { ...trip, expenses: [...trip.expenses, expense] };
    set({ trip: updated });
    await saveTrip(updated);
  },
}));