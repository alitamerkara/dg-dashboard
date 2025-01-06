"use client";

import "../styles/globals.css";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <html lang="en">
      <body>
        <header className="header">
          <nav className="nav">
            <Image src={logo} alt="My Website" width={150} height={100} />
            <div>
              {user? (
                <>
                <a href="/home">Home</a>
                <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
                </>
              ): null}
            </div>
          </nav>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">
          © 2025 My Website
        </footer>
      </body>
    </html>
  );
}