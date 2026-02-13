export interface Review {
    id: string;
    vehicleId: string;
    vehicleName: string;
    customerName: string;
    rating: number;
    comment: string;
    date: string;
    approved: boolean;
}
