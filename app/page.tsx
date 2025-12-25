import React from 'react'
import ExploreBtn from './components/ExploreBtn'

const events = [
  { image : '/images/event1.jpg', title: 'Event 1'},
  { image : '/images/event2.jpg', title: 'Event 2'},
  { image : '/images/event3.jpg', title: 'Event 3'},
  { image : '/images/event4.jpg', title: 'Event 4'},
  { image : '/images/event5.jpg', title: 'Event 5'},
]
const page = () => {
  return (
    <section> 
      <h1 className="text-center"> The Hub Event for every Dev <br/> Events you cant Miss </h1>
      <p className="text-center mt-5"> Hackathons, Meetups, and Conferences, All in One Place </p>
      <div className="items-center "> <ExploreBtn/> </div>
      

      <div className="mt-20 space-y-10">
        <h3> Featured Events </h3>

        <ul className="events">
          {[1,2,3,4,5].map((event)=> (
            <li key={event} className="event-card"> Event {event}
            </li>
          ))} 
        </ul>
      </div>
    </section>
  )
}

export default page