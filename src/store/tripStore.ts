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

type Trip = {
  destination: string;
  startDate: string;
  endDate: string;
  places: Place[];
  dayPlans: DayPlan[];
};

type TripStore = {
  trip: Trip | null;
  createTrip: (destination: string, startDate: string, endDate: string) => void;
  addPlace: (place: Place) => void;
  addDayPlan: (plan: DayPlan) => void;
};

export const useTripStore = create<TripStore>((set) => ({
  trip: null,
  createTrip: (destination, startDate, endDate) =>
    set({ trip: { destination, startDate, endDate, places: [], dayPlans: [] } }),
  addPlace: (place) =>
    set((state) => ({
      trip: state.trip ? { ...state.trip, places: [...state.trip.places, place] } : state.trip,
    })),
  addDayPlan: (plan) =>
    set((state) => ({
      trip: state.trip ? { ...state.trip, dayPlans: [...state.trip.dayPlans, plan] } : state.trip,
    })),
}));