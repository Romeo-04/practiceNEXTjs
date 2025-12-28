
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    title:string;
    image:string;
}

const EventCard = ({title, image} : Props) => {
  return (
    <div> 
    <Link href={`/events`} id='event-card'> <Image src={image} alt={title} width={410} height={300} className="poster"/> </Link>
    <p className="event-title">{title}</p>
    </div>
  )
}

export default EventCard