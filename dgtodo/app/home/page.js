"use client";

import { people } from '@/utils/peopleList';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  return (
    <div className="container">
      <h1 className="heading">Welcome!</h1>
      {people.map((person) => {
        if (person.email === email) {
          return <h2 className="subheading">Logged in as: {person.name}</h2>;
        }
      })}
      <Link href="/people">Kişiler</Link>
    </div>
  );
}
