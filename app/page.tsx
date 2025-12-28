import React from 'react'
import ExploreBtn from './components/ExploreBtn'
import EventCard from './components/EventCard'
import { time } from 'console'
import { eventsData } from '../lib/constants'

const page = () => {
  return (
    <section> 
      <h1 className="text-center"> The Hub Event for every Dev <br/> Events you cant Miss </h1>
      <p className="text-center mt-5"> Hackathons, Meetups, and Conferences, All in One Place </p>
      <div className="items-center "> <ExploreBtn/> </div>
      

      <div className="mt-20 space-y-10">
        <h3> Featured Events </h3>

        <ul className="events list-none">
          {eventsData.map((event)=> (
            <li key={event.title} className="event-card"> <EventCard {...event} />
            </li>
          ))} 
        </ul>
      </div>
    </section>
  )
}

export default page