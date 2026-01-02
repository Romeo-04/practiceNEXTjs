'use server';

import { connect } from "http2";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/database/event.model";

export const getSimilarEventsBySlug = async ( slug: string) => {
    try {
        await connectToDatabase();

        const event = await Event.findOne ({slug});
        await Event.find({
            _id: { $ne: event?._id },
            tags: { $in: event?.tags || [] }    
        })
        return await Event.find({
            _id: { $ne: event?._id },
            tags: { $in: event?.tags || [] }    
        })
    } catch (e) {
        console.log('Database connection error:', e);
        return [];
    }
}