import type { Vehicle, Location, Extra, Insurance } from '@/types/vehicle';
import type { Reservation } from '@/types/booking';
import type { Review } from '@/types/review';

// Mock vehicle fleet
export const mockVehicles: Vehicle[] = [
    {
        id: 'v1',
        name: 'Toyota Yaris',
        classId: 'economy',
        category: 'Economy',
        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
            'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&q=80',
        ],
        description: 'Perfect for city driving and budget-conscious travelers. Fuel-efficient and easy to park.',
        specs: { transmission: 'Manual', fuel: 'Petrol', seats: 5, doors: 5, luggage: 2, airConditioning: true },
        pricePerDay: 45,
        currency: 'EUR',
        available: true,
        features: ['Bluetooth', 'USB Charging', 'GPS Available'],
    },
    {
        id: 'v2',
        name: 'Hyundai i20',
        classId: 'economy',
        category: 'Economy',
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
        ],
        description: 'A reliable compact car with great fuel economy and comfortable ride.',
        specs: { transmission: 'Automatic', fuel: 'Petrol', seats: 5, doors: 5, luggage: 2, airConditioning: true },
        pricePerDay: 50,
        currency: 'EUR',
        available: true,
        features: ['Bluetooth', 'Apple CarPlay', 'Heated Seats'],
    },
    {
        id: 'v3',
        name: 'Volkswagen Golf',
        classId: 'compact',
        category: 'Compact',
        image: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=800&q=80',
        ],
        description: 'The versatile Golf offers a premium driving experience in a compact package.',
        specs: { transmission: 'Automatic', fuel: 'Petrol', seats: 5, doors: 5, luggage: 3, airConditioning: true },
        pricePerDay: 65,
        currency: 'EUR',
        available: true,
        features: ['Apple CarPlay', 'Android Auto', 'Cruise Control', 'Heated Seats'],
    },
    {
        id: 'v4',
        name: 'Toyota RAV4',
        classId: 'suv',
        category: 'SUV',
        image: 'https://www.topgear.com/sites/default/files/2024/09/Toyota-RAV4-Hybrid-036.jpg?w=892&h=502',
        images: [
            'https://www.topgear.com/sites/default/files/2024/09/Toyota-RAV4-Hybrid-036.jpg?w=892&h=502',
        ],
        description: 'A spacious SUV ideal for families and adventurous road trips through the highlands.',
        specs: { transmission: 'Automatic', fuel: 'Hybrid', seats: 5, doors: 5, luggage: 4, airConditioning: true },
        pricePerDay: 95,
        currency: 'EUR',
        available: true,
        features: ['4WD', 'Apple CarPlay', 'Backup Camera', 'Heated Seats', 'Cruise Control'],
    },
    {
        id: 'v5',
        name: 'Dacia Duster 4x4',
        classId: '4x4',
        category: '4x4',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
        ],
        description: 'Conquer any terrain with this rugged 4x4. Perfect for highland adventures and F-roads.',
        specs: { transmission: 'Manual', fuel: 'Diesel', seats: 5, doors: 5, luggage: 3, airConditioning: true },
        pricePerDay: 85,
        currency: 'EUR',
        available: true,
        features: ['4WD', 'GPS', 'Roof Rack', 'Off-Road Tires'],
    },
    {
        id: 'v6',
        name: 'Tesla Model 3',
        classId: 'premium',
        category: 'Premium',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
        ],
        description: 'Experience the future of driving with zero emissions and cutting-edge technology.',
        specs: { transmission: 'Automatic', fuel: 'Electric', seats: 5, doors: 4, luggage: 3, airConditioning: true },
        pricePerDay: 120,
        currency: 'EUR',
        available: false,
        features: ['Autopilot', 'Full Self-Driving', 'Premium Audio', 'Glass Roof'],
    },
    {
        id: 'v7',
        name: 'Toyota Proace',
        classId: 'van',
        category: 'Van',
        image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=800&q=80',
        ],
        description: 'Spacious van perfect for group travel or carrying lots of equipment.',
        specs: { transmission: 'Automatic', fuel: 'Diesel', seats: 9, doors: 5, luggage: 6, airConditioning: true },
        pricePerDay: 130,
        currency: 'EUR',
        available: true,
        features: ['Bluetooth', 'Backup Camera', 'Cruise Control'],
    },
    {
        id: 'v8',
        name: 'Kia Sportage',
        classId: 'mid-size',
        category: 'Mid-Size',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
        ],
        description: 'A well-rounded mid-size option with a comfortable ride and plenty of space.',
        specs: { transmission: 'Automatic', fuel: 'Diesel', seats: 5, doors: 5, luggage: 3, airConditioning: true },
        pricePerDay: 75,
        currency: 'EUR',
        available: true,
        features: ['Apple CarPlay', 'Heated Steering Wheel', 'Parking Sensors', 'Lane Assist'],
    },
];

export const mockLocations: Location[] = [
    { id: 'loc1', name: 'Keflavík Airport (KEF)', address: 'Keflavík International Airport', type: 'airport' },
    { id: 'loc2', name: 'Reykjavík Downtown', address: 'Laugavegur 12, 101 Reykjavík', type: 'city' },
    { id: 'loc3', name: 'Akureyri Airport', address: 'Akureyri Airport, 600 Akureyri', type: 'airport' },
    { id: 'loc4', name: 'Hotel Pickup', address: 'Hotel delivery within Reykjavík', type: 'hotel' },
];

export const mockExtras: Extra[] = [
    { id: 'ext1', name: 'GPS Navigation', description: 'Portable GPS device with Iceland maps', pricePerDay: 10, currency: 'EUR', selected: false },
    { id: 'ext2', name: 'Child Seat', description: 'Suitable for children aged 1–4 years', pricePerDay: 8, currency: 'EUR', selected: false },
    { id: 'ext3', name: 'Booster Seat', description: 'Suitable for children aged 4–12 years', pricePerDay: 6, currency: 'EUR', selected: false },
    { id: 'ext4', name: 'Additional Driver', description: 'Add one extra driver to the reservation', pricePerDay: 12, currency: 'EUR', selected: false },
    { id: 'ext5', name: 'Wi-Fi Hotspot', description: 'Stay connected on the road', pricePerDay: 8, currency: 'EUR', selected: false },
    { id: 'ext6', name: 'Roof Box', description: 'Extra luggage space on the roof', pricePerDay: 15, currency: 'EUR', selected: false },
];

export const mockInsurances: Insurance[] = [
    {
        id: 'ins1',
        name: 'Basic Protection',
        description: 'Standard CDW coverage with a deductible',
        coverage: ['Collision Damage Waiver (CDW)', 'Theft Protection'],
        pricePerDay: 0,
        currency: 'EUR',
    },
    {
        id: 'ins2',
        name: 'Premium Protection',
        description: 'Enhanced coverage with reduced deductible',
        coverage: ['CDW', 'Theft Protection', 'Gravel Protection', 'Sand & Ash Protection'],
        pricePerDay: 18,
        currency: 'EUR',
        recommended: true,
    },
    {
        id: 'ins3',
        name: 'Platinum Protection',
        description: 'Maximum coverage with zero deductible',
        coverage: ['CDW', 'Theft Protection', 'Gravel Protection', 'Sand & Ash Protection', 'Tire & Windshield', 'Zero Deductible'],
        pricePerDay: 30,
        currency: 'EUR',
    },
];

export const mockReviews: Review[] = [
    { id: 'r1', vehicleId: 'v4', vehicleName: 'Toyota RAV4', customerName: 'Sarah M.', rating: 5, comment: 'Amazing car for the ring road! Very comfortable and fuel efficient. Would definitely rent again.', date: '2026-01-15', approved: true },
    { id: 'r2', vehicleId: 'v3', vehicleName: 'Volkswagen Golf', customerName: 'James T.', rating: 4, comment: 'Great car, clean and well maintained. The pick-up process was smooth and quick.', date: '2026-01-10', approved: true },
    { id: 'r3', vehicleId: 'v5', vehicleName: 'Dacia Duster 4x4', customerName: 'Anna K.', rating: 5, comment: 'Handled the highland roads like a champ! The team was incredibly helpful with route suggestions.', date: '2026-01-05', approved: true },
    { id: 'r4', vehicleId: 'v1', vehicleName: 'Toyota Yaris', customerName: 'Michael B.', rating: 4, comment: 'Efficient little car, perfect for Reykjavík and the Golden Circle. Easy to park everywhere.', date: '2025-12-28', approved: true },
    { id: 'r5', vehicleId: 'v6', vehicleName: 'Tesla Model 3', customerName: 'Lisa R.', rating: 5, comment: 'What an experience! The charging infrastructure in Iceland is excellent. Loved every minute.', date: '2025-12-20', approved: true },
    { id: 'r6', vehicleId: 'v8', vehicleName: 'Kia Sportage', customerName: 'David P.', rating: 3, comment: 'Good car overall but had a small scratch when we picked it up. Staff resolved it quickly though.', date: '2025-12-15', approved: true },
];

export const mockReservations: Reservation[] = [
    {
        id: 'res1',
        confirmationCode: 'BCR-2026-001',
        vehicleId: 'v4',
        vehicleName: 'Toyota RAV4',
        vehicleImage: 'https://images.unsplash.com/photo-1568844293986-8d0400f085a0?w=600&q=80',
        dates: { pickupDate: '2026-03-01', pickupTime: '10:00', dropoffDate: '2026-03-07', dropoffTime: '10:00' },
        pickupLocation: 'Keflavík Airport (KEF)',
        dropoffLocation: 'Keflavík Airport (KEF)',
        extras: [],
        insurance: mockInsurances[1],
        customer: { firstName: 'Sarah', lastName: 'Miller', email: 'sarah@example.com', phone: '+1234567890', licenseNumber: 'DL123456', country: 'US' },
        totalPrice: 678,
        currency: 'EUR',
        status: 'confirmed',
        createdAt: '2026-01-20T14:30:00Z',
    },
];
