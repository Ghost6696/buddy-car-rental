import { mockReservations } from './mock-data';
import type { Reservation, CustomerInfo, BookingDates } from '@/types/booking';
import type { Extra, Insurance } from '@/types/vehicle';

// FORCE MOCK FOR DEMO DEPLOYMENT
const USE_MOCK = true; // import.meta.env.VITE_USE_MOCK === 'true';

let localReservations = [...mockReservations];
let nextId = 2;

/** Create a new reservation */
export async function createReservation(data: {
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
}): Promise<Reservation> {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 500));
        const reservation: Reservation = {
            id: `res${nextId}`,
            confirmationCode: `BCR-2026-${String(nextId).padStart(3, '0')}`,
            ...data,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
        };
        nextId++;
        localReservations.push(reservation);
        return reservation;
    }

    // TODO: carenPost('/Reservation/Add', body)
    throw new Error('Live API not configured');
}

/** Look up a reservation by confirmation code + email */
export async function lookupReservation(
    code: string,
    email: string
): Promise<Reservation | null> {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 300));
        const cleanCode = code.trim().toLowerCase();
        const cleanEmail = email.trim().toLowerCase();

        console.log(`Looking up: ${cleanCode} / ${cleanEmail}`);
        console.log('Available codes:', localReservations.map(r => r.confirmationCode.toLowerCase()));

        return localReservations.find(
            r => r.confirmationCode.toLowerCase() === cleanCode && r.customer.email.toLowerCase() === cleanEmail
        ) || null;
    }

    return null;
}

/** Cancel a reservation */
export async function cancelReservation(id: string): Promise<boolean> {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 300));
        const idx = localReservations.findIndex(r => r.id === id);
        if (idx >= 0) {
            localReservations[idx] = { ...localReservations[idx], status: 'cancelled' };
            return true;
        }
        return false;
    }

    return false;
}

/** Get all reservations (admin) */
export async function getAllReservations(): Promise<Reservation[]> {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 200));
        return localReservations;
    }

    return [];
}
