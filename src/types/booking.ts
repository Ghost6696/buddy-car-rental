// Booking & Reservation types

export interface BookingDates {
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
}

export interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    flightNumber?: string;
    licenseNumber: string;
    country: string;
}

export interface Extra {
    id: string;
    name: string;
    description: string;
    pricePerDay: number;
    currency: string;
    icon?: string;
    selected: boolean;
}

export interface Insurance {
    id: string;
    name: string;
    description: string;
    coverage: string[];
    pricePerDay: number;
    currency: string;
    recommended?: boolean;
}

export interface Reservation {
    id: string;
    confirmationCode: string;
    vehicleId: string;
    vehicleName: string;
    vehicleImage: string;
    dates: BookingDates;
    pickupLocation: string;
    dropoffLocation: string;
    extras: Extra[];
    insurance: Insurance | null;
    customer: CustomerInfo;
    totalPrice: number;
    currency: string;
    status: ReservationStatus;
    createdAt: string;
}

export type ReservationStatus =
    | 'confirmed'
    | 'pending'
    | 'cancelled'
    | 'completed';

export type BookingStep = 1 | 2 | 3 | 4;
