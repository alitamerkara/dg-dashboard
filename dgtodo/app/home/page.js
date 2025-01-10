"use client";


import { people } from '../../utils/peopleList';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import "../../styles/globals.css";

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
    <div className="home-container">
      <h1 className="home-heading">Welcome!</h1>
      {people.map((person) => {
        if (person.email === email) {
          return <h2 key={person.id} className="home-subheading">Logged in as: {person.name}</h2>;
        }
      })}
      <div className="home-links">
        <Link href="/people" style={{textDecoration:"none"}}>
          <div className="home-link">Kişiler</div>
        </Link>
        <Link href="/duties" style={{textDecoration:"none"}}>
          <div className="home-link">Görevler</div>
        </Link>
      </div>
    </div>
  );
}
