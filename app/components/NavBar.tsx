import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  return (
    <header>
      <nav aria-label="Main navigation">
        <Link href="/" className="logo flex items-center gap-2">
          <Image src="/icons/logo.png" alt="" width={24} height={24} aria-hidden="true" />
          <span>DevEvent</span>
        </Link>
        
        <ul className="flex space-x-6 list-none" role="list">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;