import ExploreBtn from './components/ExploreBtn'
import EventCard from './components/EventCard'
import { IEvent } from '../database';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async() => {
  const response = await fetch(`${BASE_URL}/api/events`, {
    cache: 'no-store', // Always fetch fresh data
    // OR use revalidation:
    // next: { revalidate: 0 }
  });
  const {events} = await response.json();

  return (
    <section> 
      <h1 className="text-center"> The Hub Event for every Dev <br/> Events you cant Miss </h1>
      <p className="text-center mt-5"> Hackathons, Meetups, and Conferences, All in One Place </p>
      <div className="items-center "> <ExploreBtn/> </div>
      

      <div className="mt-20 space-y-10">
        <h3> Featured Events </h3>

        <ul className="events list-none">
          {events && events.length > 0 && events.map((event : IEvent)=> (
            <li key={event.title} className="event-card"> <EventCard {...event} />
            </li>
          ))} 
        </ul>
      </div>
    </section>
  )
}

export default page