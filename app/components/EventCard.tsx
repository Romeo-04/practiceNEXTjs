import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <div>
      <Link href={`/events/${slug}`} id="event-card">
        <Image
          src={image}
          alt={title}
          width={410}
          height={300}
          className="poster"
        />

        <div className="flex flex-row gap-2">
          <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
          <p className="event-location">{location}</p>
        </div>

        <p className="event-title">{title}</p>

        <div className="datetime">
          <div className="flex items-center gap-1">
            <Image src="/icons/calendar.svg" alt="" width={14} height={14} aria-hidden="true" />
            <span className="event-date">{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/icons/clock.svg" alt="" width={14} height={14} aria-hidden="true" />
            <span className="event-time">{time}</span>
          </div>
        </div>

      </Link>
    </div>
  );
};

export default EventCard;
