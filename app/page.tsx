import ExploreBtn from './components/ExploreBtn'
import EventCard from './components/EventCard'
import { IEvent } from '../database';
import {cacheLife} from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const HomePage = async () => {
  'use cache';
  cacheLife('hours');
  const response = await fetch(`${BASE_URL}/api/events`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  
  const { events } = await response.json();

  return (
    <section> 
      <h1 className="text-center"> The Hub Event for every Dev <br/> Events you cant Miss </h1>
      <p className="text-center mt-5"> Hackathons, Meetups, and Conferences, All in One Place </p>
      <div className="items-center "> <ExploreBtn/> </div>
      

      <div className="mt-20 space-y-10">
        <h3> Featured Events </h3>

        <ul className="events list-none">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.slug} className="event-card">
              <EventCard {...event} />
            </li>
          ))} 
        </ul>
      </div>
    </section>
  );
};

export default HomePage;