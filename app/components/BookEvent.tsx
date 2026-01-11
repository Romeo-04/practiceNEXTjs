'use client';
import { createBooking } from '@/lib/actions/booking.actions';
import { posthog } from 'posthog-js';
import React from 'react'

const BookEvent = ({eventId, slug}:{eventId: string, slug: string}) => {
    const [email,setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {success} = await createBooking({eventId, email});
        if(success){
            setSubmitted(true);
            posthog.capture('event_booked', {eventId, slug, email});
        } else {
            console.error('Booking failed');
        }
        // Here you can handle the form submission, e.g., send the email to your backend
        setTimeout (() => {
            setSubmitted(true);
        })
    }
  return (
    <div id="book-event">
        {submitted?(
            <p className="text-sm"> Thank you for signing up! </p>
        ) : (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <input 
                        type="email" 
                        id="email"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <button type="submit" className="button-submit">Submit</button>
            </form>
        )}
    </div>
  )
}

export default BookEvent