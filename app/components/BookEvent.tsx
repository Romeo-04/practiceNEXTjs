'use client';
import React from 'react'

const BookEvent = () => {
    const [email,setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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