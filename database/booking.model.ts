import mongoose, { Schema, Document, Model } from 'mongoose';
import Event from './event.model';

/**
 * TypeScript interface for Booking document
 */
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema definition
 */
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true, // Index for faster queries
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to validate that the referenced event exists
 * Throws an error if the event is not found in the database
 */
BookingSchema.pre('save', async function (next) {
  // Only validate eventId if it's new or modified
  if (this.isNew || this.isModified('eventId')) {
    try {
      const eventExists = await Event.findById(this.eventId);
      
      if (!eventExists) {
        return next(new Error('Event not found. Cannot create booking for non-existent event.'));
      }
      
      next();
    } catch (error) {
      return next(new Error('Error validating event: ' + (error as Error).message));
    }
  } else {
    next();
  }
});

/**
 * Create and export the Booking model
 * Uses singleton pattern to prevent model recompilation in development
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
