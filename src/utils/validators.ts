import { z } from 'zod';

export const customerSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(5, 'Phone number is required'),
    flightNumber: z.string().optional(),
    licenseNumber: z.string().min(3, 'License number is required'),
    country: z.string().min(2, 'Country is required'),
});

export const bookingLookupSchema = z.object({
    confirmationCode: z.string().min(3, 'Confirmation code is required'),
    email: z.string().email('Invalid email address'),
});

export const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(3, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
export type BookingLookupData = z.infer<typeof bookingLookupSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
