import { create } from 'zustand';
import type { Vehicle } from '@/types/vehicle';
import type { BookingDates, BookingStep, CustomerInfo } from '@/types/booking';
import type { Extra, Insurance } from '@/types/vehicle';

interface BookingState {
    // Current step
    step: BookingStep;

    // Dates & locations
    dates: BookingDates;
    pickupLocation: string;
    dropoffLocation: string;

    // Vehicle
    selectedVehicle: Vehicle | null;

    // Extras & insurance
    extras: Extra[];
    insurance: Insurance | null;

    // Customer
    customer: CustomerInfo | null;

    // Pricing
    totalPrice: number;
    numberOfDays: number;

    // Actions
    setStep: (step: BookingStep) => void;
    setDates: (dates: BookingDates) => void;
    setPickupLocation: (location: string) => void;
    setDropoffLocation: (location: string) => void;
    selectVehicle: (vehicle: Vehicle) => void;
    setExtras: (extras: Extra[]) => void;
    toggleExtra: (extraId: string) => void;
    setInsurance: (insurance: Insurance | null) => void;
    setCustomer: (customer: CustomerInfo) => void;
    calculateTotal: () => void;
    reset: () => void;
}

const initialState = {
    step: 1 as BookingStep,
    dates: { pickupDate: '', pickupTime: '10:00', dropoffDate: '', dropoffTime: '10:00' },
    pickupLocation: '',
    dropoffLocation: '',
    selectedVehicle: null,
    extras: [] as Extra[],
    insurance: null,
    customer: null,
    totalPrice: 0,
    numberOfDays: 1,
};

export const useBookingStore = create<BookingState>((set, get) => ({
    ...initialState,

    setStep: (step) => set({ step }),

    setDates: (dates) => {
        const start = new Date(dates.pickupDate);
        const end = new Date(dates.dropoffDate);
        const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
        set({ dates, numberOfDays: days });
        get().calculateTotal();
    },

    setPickupLocation: (location) => set({ pickupLocation: location }),
    setDropoffLocation: (location) => set({ dropoffLocation: location }),

    selectVehicle: (vehicle) => {
        set({ selectedVehicle: vehicle });
        get().calculateTotal();
    },

    setExtras: (extras) => {
        set({ extras });
        get().calculateTotal();
    },

    toggleExtra: (extraId) => {
        const extras = get().extras.map(e =>
            e.id === extraId ? { ...e, selected: !e.selected } : e
        );
        set({ extras });
        get().calculateTotal();
    },

    setInsurance: (insurance) => {
        set({ insurance });
        get().calculateTotal();
    },

    setCustomer: (customer) => set({ customer }),

    calculateTotal: () => {
        const { selectedVehicle, extras, insurance, numberOfDays } = get();
        if (!selectedVehicle) return;

        let total = selectedVehicle.pricePerDay * numberOfDays;

        // Add selected extras
        const extrasTotal = extras
            .filter(e => e.selected)
            .reduce((sum, e) => sum + e.pricePerDay * numberOfDays, 0);
        total += extrasTotal;

        // Add insurance
        if (insurance && insurance.pricePerDay > 0) {
            total += insurance.pricePerDay * numberOfDays;
        }

        set({ totalPrice: total });
    },

    reset: () => set(initialState),
}));
