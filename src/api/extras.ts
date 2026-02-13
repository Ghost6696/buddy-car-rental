import { mockExtras, mockInsurances, mockLocations } from './mock-data';
import type { Extra, Insurance, Location } from '@/types/vehicle';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export async function getExtras(): Promise<Extra[]> {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 200));
        return mockExtras.map(e => ({ ...e, selected: false }));
    }
    return mockExtras;
}

export async function getInsurances(): Promise<Insurance[]> {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 200));
        return mockInsurances;
    }
    return mockInsurances;
}

export async function getLocations(): Promise<Location[]> {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 200));
        return mockLocations;
    }
    return mockLocations;
}
