// Caren.io VehicleAPI response types

export interface CarenLoginResponse {
    sessionKey: string;
    expiresIn: number;
}

export interface CarenVehicleClass {
    classId: number;
    className: string;
    classDescription: string;
    imageUrl: string;
    images: string[];
    transmission: string;
    fuelType: string;
    seats: number;
    doors: number;
    largeBags: number;
    airConditioning: boolean;
    pricePerDay: number;
    currency: string;
    features: string[];
}

export interface CarenAvailability {
    classId: number;
    available: boolean;
    count: number;
}

export interface CarenPricing {
    classId: number;
    totalPrice: number;
    pricePerDay: number;
    currency: string;
    days: number;
}

export interface CarenLocation {
    locationId: number;
    name: string;
    address: string;
    type: string;
}

export interface CarenExtra {
    extraId: number;
    name: string;
    description: string;
    pricePerDay: number;
    currency: string;
}

export interface CarenInsurance {
    insuranceId: number;
    name: string;
    description: string;
    coverage: string[];
    pricePerDay: number;
    currency: string;
}

export interface CarenReservation {
    reservationId: number;
    confirmationCode: string;
    status: string;
    classId: number;
    className: string;
    imageUrl: string;
    pickupDate: string;
    dropoffDate: string;
    pickupLocationId: number;
    dropoffLocationId: number;
    extras: number[];
    insuranceId: number | null;
    totalPrice: number;
    currency: string;
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        flightNumber?: string;
        licenseNumber: string;
        country: string;
    };
    createdAt: string;
}
