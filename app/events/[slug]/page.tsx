'use cache';

import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "../../components/BookEvent";
import React from "react";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/app/components/EventCard";
import { cacheLife } from 'next/cache';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface EventDetailItemProps {
  icon: string;
  alt: string;
  label: string;
}

const EventDetailItem = ({ icon, alt, label }: EventDetailItemProps) => (
  <div className="flex flex-row gap-2 items-center">
    <Image src={icon} alt={alt} width={24} height={24} />
    <span>{label}</span>
  </div>
);

interface EventAgendaProps {
  agendaItems: string[];
}


const EventAgenda = ({ agendaItems }: EventAgendaProps) => (
  <div className="flex flex-col gap-2">
    <h2> Agenda </h2>
    <ul className="list-disc list-inside">
      {agendaItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

interface EventTagsProps {
  tags: string[];
}

const EventTags = ({ tags }: EventTagsProps) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <span className="pill" key={tag}>{tag}</span>
    ))}
  </div>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  cacheLife('hours');
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`, {
    next : { revalidate: 60 },
  });

  if (!response.ok) {
    return notFound();
  }

  const data = await response.json();
  const event = data?.event;

  if (!event) {
    return notFound();
  }

  const {
    description,
    title,
    image,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    overview,
    organizer,
  } = event;

  const bookings = 10;

  const similarEvents : IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        {/* Event Content Here */}
        <div className="content">
          <Image
            src={image}
            alt={`${title} event banner`}
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex flex-col gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="" label={date} />
            <EventDetailItem icon="/icons/clock.svg" alt="" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="" label={mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="" label={audience} />
          </section>

          <EventAgenda agendaItems={Array.isArray(agenda) && agenda.length > 0 ? agenda[0].split(',').map((item: string) => item.trim()) : []} />

          <section>
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={Array.isArray(tags) && tags.length > 0 ? tags[0].split(',').map((tag: string) => tag.trim()) : []} />

        </div>
        {/* Booking Form Here */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="spots-available">{bookings} spots available</p>
            ): (
              <p className="spots-unavailable">No spots available</p>
            )}
            <BookEvent eventId={event._id} slug ={event.slug}/>
          </div>
        </aside>
      </div>
      
      <div className="flex w-full flex-col gap-4 mt-10">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 ? similarEvents.map((similarEvent:IEvent) => (
            <EventCard key={similarEvent.title} {...similarEvent} />
          )) : (
            <p>No similar events found.</p>
          )} 
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
