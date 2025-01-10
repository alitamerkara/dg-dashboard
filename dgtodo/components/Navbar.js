import Link from 'next/link';
import { useSession } from 'next-auth/react';
// import '../../app/globals.css';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      {/* ...existing code... */}
      {session && (
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      )}
      {/* ...existing code... */}
    </nav>
  );
}
