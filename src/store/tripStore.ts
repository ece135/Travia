import { create } from 'zustand';
import { doc, setDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
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
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  places: Place[];
  dayPlans: DayPlan[];
  totalBudget: number;
  expenses: Expense[];
};

type TripStore = {
  trips: Trip[];
  activeTripId: string | null;
  loading: boolean;

  loadTrips: () => Promise<void>;
  createTrip: (destination: string, startDate: string, endDate: string) => Promise<void>;
  setActiveTrip: (id: string) => void;
  getActiveTrip: () => Trip | null;

  addPlace: (place: Place) => Promise<void>;
  addDayPlan: (plan: DayPlan) => Promise<void>;
  deleteDayPlan: (id: string) => Promise<void>;
  setTotalBudget: (amount: number) => Promise<void>;
  addExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
};

async function saveTrip(trip: Trip) {
  await setDoc(doc(db, 'trips', trip.id), trip);
}

export const useTripStore = create<TripStore>((set, get) => ({
  trips: [],
  activeTripId: null,
  loading: false,

  loadTrips: async () => {
    set({ loading: true });
    const snap = await getDocs(collection(db, 'trips'));
    const trips: Trip[] = snap.docs.map((d) => ({ ...(d.data() as Trip), id: d.id }));
    set({ trips, loading: false });
  },

  createTrip: async (destination, startDate, endDate) => {
    const id = Date.now().toString();
    const newTrip: Trip = { id, destination, startDate, endDate, places: [], dayPlans: [], totalBudget: 0, expenses: [] };
    set((state) => ({ trips: [...state.trips, newTrip], activeTripId: id }));
    await saveTrip(newTrip);
  },

  setActiveTrip: (id) => set({ activeTripId: id }),

  getActiveTrip: () => {
    const state = get();
    return state.trips.find((t) => t.id === state.activeTripId) || null;
  },

  addPlace: async (place) => {
    const trip = get().getActiveTrip();
    if (!trip) return;
    const updated = { ...trip, places: [...trip.places, place] };
    set((state) => ({ trips: state.trips.map((t) => (t.id === trip.id ? updated : t)) }));
    await saveTrip(updated);
  },

  addDayPlan: async (plan) => {
    const trip = get().getActiveTrip();
    if (!trip) return;
    const updated = { ...trip, dayPlans: [...trip.dayPlans, plan] };
    set((state) => ({ trips: state.trips.map((t) => (t.id === trip.id ? updated : t)) }));
    await saveTrip(updated);
  },

  deleteDayPlan: async (id) => {
    const trip = get().getActiveTrip();
    if (!trip) return;
    const updated = { ...trip, dayPlans: trip.dayPlans.filter((p) => p.id !== id) };
    set((state) => ({ trips: state.trips.map((t) => (t.id === trip.id ? updated : t)) }));
    await saveTrip(updated);
  },

  setTotalBudget: async (amount) => {
    const trip = get().getActiveTrip();
    if (!trip) return;
    const updated = { ...trip, totalBudget: amount };
    set((state) => ({ trips: state.trips.map((t) => (t.id === trip.id ? updated : t)) }));
    await saveTrip(updated);
  },

  addExpense: async (expense) => {
    const trip = get().getActiveTrip();
    if (!trip) return;
    const updated = { ...trip, expenses: [...trip.expenses, expense] };
    set((state) => ({ trips: state.trips.map((t) => (t.id === trip.id ? updated : t)) }));
    await saveTrip(updated);
  },

  deleteExpense: async (id) => {
    const trip = get().getActiveTrip();
    if (!trip) return;
    const updated = { ...trip, expenses: trip.expenses.filter((e) => e.id !== id) };
    set((state) => ({ trips: state.trips.map((t) => (t.id === trip.id ? updated : t)) }));
    await saveTrip(updated);
  },

  deleteTrip: async (id) => {
    await deleteDoc(doc(db, 'trips', id));
    set((state) => ({ 
      trips: state.trips.filter((t) => t.id !== id),
      activeTripId: state.activeTripId === id ? null : state.activeTripId,
    }));
  },
}));