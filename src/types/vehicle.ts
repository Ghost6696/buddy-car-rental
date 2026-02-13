// Vehicle & Fleet types (mapped from Caren.io VehicleAPI)

export interface Vehicle {
    id: string;
    name: string;
    classId: string;
    category: VehicleCategory;
    image: string;
    images: string[];
    description: string;
    specs: VehicleSpecs;
    pricePerDay: number;
    currency: string;
    available: boolean;
    features: string[];
}

export interface VehicleSpecs {
    transmission: 'Automatic' | 'Manual';
    fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
    seats: number;
    doors: number;
    luggage: number;
    airConditioning: boolean;
}

export type VehicleCategory =
    | 'Economy'
    | 'Compact'
    | 'Mid-Size'
    | 'SUV'
    | 'Premium'
    | 'Van'
    | '4x4';

export interface VehicleFilter {
    category?: VehicleCategory;
    transmission?: 'Automatic' | 'Manual';
    fuel?: string;
    minSeats?: number;
    priceRange?: [number, number];
    sortBy?: 'price-asc' | 'price-desc' | 'name' | 'popularity';
}

export interface Location {
    id: string;
    name: string;
    address: string;
    type: 'airport' | 'city' | 'hotel';
}

// Re-export booking-related types for convenience
export type { Extra, Insurance } from './booking';
