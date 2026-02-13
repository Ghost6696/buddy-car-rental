import { mockVehicles } from './mock-data';
import type { Vehicle, VehicleFilter } from '@/types/vehicle';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

/** Fetch all vehicle classes */
export async function getVehicles(filter?: VehicleFilter): Promise<Vehicle[]> {
    if (USE_MOCK) {
        let vehicles = [...mockVehicles];

        if (filter?.category) {
            vehicles = vehicles.filter(v => v.category === filter.category);
        }
        if (filter?.transmission) {
            vehicles = vehicles.filter(v => v.specs.transmission === filter.transmission);
        }
        if (filter?.fuel) {
            vehicles = vehicles.filter(v => v.specs.fuel === filter.fuel);
        }
        if (filter?.minSeats) {
            vehicles = vehicles.filter(v => v.specs.seats >= filter.minSeats!);
        }
        if (filter?.priceRange) {
            vehicles = vehicles.filter(v => v.pricePerDay >= filter.priceRange![0] && v.pricePerDay <= filter.priceRange![1]);
        }

        // Sort
        switch (filter?.sortBy) {
            case 'price-asc':
                vehicles.sort((a, b) => a.pricePerDay - b.pricePerDay);
                break;
            case 'price-desc':
                vehicles.sort((a, b) => b.pricePerDay - a.pricePerDay);
                break;
            case 'name':
                vehicles.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        // Simulate network delay
        await new Promise(r => setTimeout(r, 300));
        return vehicles;
    }

    // TODO: Live Caren.io API integration
    // const data = await carenGet<CarenVehicleClass[]>('/List');
    // return data.map(mapCarenToVehicle);
    return mockVehicles;
}

/** Fetch a single vehicle by ID */
export async function getVehicle(id: string): Promise<Vehicle | null> {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 200));
        return mockVehicles.find(v => v.id === id) || null;
    }

    return mockVehicles.find(v => v.id === id) || null;
}

/** Check availability for a date range */
export async function checkAvailability(
    pickupDate: string,
    dropoffDate: string
): Promise<string[]> {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 200));
        return mockVehicles.filter(v => v.available).map(v => v.id);
    }

    return mockVehicles.filter(v => v.available).map(v => v.id);
}

/** Get pricing for a vehicle and date range */
export async function getVehiclePricing(
    vehicleId: string,
    pickupDate: string,
    dropoffDate: string
): Promise<{ pricePerDay: number; totalPrice: number; days: number; currency: string } | null> {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 200));
        const vehicle = mockVehicles.find(v => v.id === vehicleId);
        if (!vehicle) return null;

        const start = new Date(pickupDate);
        const end = new Date(dropoffDate);
        const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

        return {
            pricePerDay: vehicle.pricePerDay,
            totalPrice: vehicle.pricePerDay * days,
            days,
            currency: vehicle.currency,
        };
    }

    return null;
}
