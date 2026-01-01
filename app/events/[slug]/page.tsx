import { notFound } from 'next/navigation';
import React from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
    cache: 'no-store', // Always fetch fresh data
    // OR use revalidation:
    // next: { revalidate: 0 }
    });

    const { event : {description,title, image, date, time, location,mode,agenda, audience, tags} } = await request.json();
    if(!description) return notFound();
    
  return (
    <section id='event'>
        <div className = 'header'>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </section>
  )
}

export default EventDetailsPage