import { create } from 'zustand';

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

type TripStore = {
  trip: Trip | null;
  createTrip: (destination: string, startDate: string, endDate: string) => void;
  addPlace: (place: Place) => void;
  addDayPlan: (plan: DayPlan) => void;
  setTotalBudget: (amount: number) => void;
  addExpense: (expense: Expense) => void;
};

export const useTripStore = create<TripStore>((set) => ({
  trip: null,
  createTrip: (destination, startDate, endDate) =>
    set({ trip: { destination, startDate, endDate, places: [], dayPlans: [], totalBudget: 0, expenses: [] } }),
  addPlace: (place) =>
    set((state) => ({
      trip: state.trip ? { ...state.trip, places: [...state.trip.places, place] } : state.trip,
    })),
  addDayPlan: (plan) =>
    set((state) => ({
      trip: state.trip ? { ...state.trip, dayPlans: [...state.trip.dayPlans, plan] } : state.trip,
    })),
  setTotalBudget: (amount) =>
  set((state) => ({
    trip: state.trip ? { ...state.trip, totalBudget: amount } : state.trip,
    })),
  addExpense: (expense) =>
    set((state) => ({
      trip: state.trip ? { ...state.trip, expenses: [...state.trip.expenses, expense] } : state.trip,
    })),
}));