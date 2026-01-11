'use server';
import connectToDatabase from "../mongodb";
import Booking from "@/database/booking.model";

export const createBooking = async ( {eventId, email} : {eventId: string, email: string} ) => {
    try {
        await connectToDatabase();
        await Booking.create({ eventId, email });
        return {success : true};
    } catch (e) {
        console.log('Booking creation error:', e);
        return {success : false};
    }
}