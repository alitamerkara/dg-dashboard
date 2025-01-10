"use client";

import Image from "next/image";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { people } from "../utils/peopleList";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userProfile = people.find((p) => p.email === user.email);
        if (userProfile) {
          setName(userProfile.name);
        }
      } else {
        setUser(null);
        setName("");
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
          <div className="main-nav" style={{backgroundColor:"#45a049", display:"flex", justifyContent:"space-between", alignItems:"center",padding:"10px 250px"}}>
            <Image src={logo} alt="My Website" width={180} height={100} className="nav-logo" />
            <div className="nav-links" style={{gap:"20px", display:"flex"}}>
              {user ? (
                <>
                  <a href="/home" className="nav-link" style={{textDecoration:"none", color:"#fff"}}>Home</a>
                  <a href={`/profile/${name}`} className="nav-link" style={{textDecoration:"none", color:"#fff"}}>Profil</a>
                  <a onClick={handleSignOut} className="sign-out-button" style={{textDecoration:"none", color:"#fff", cursor:"pointer"}}>Sign Out</a>
                </> 
              ) : null}
            </div>
          </div>
        </header>
        <main className="main">{children}</main>
        {/* <footer className="footer">
          © 2025 My Website
        </footer> */}
      </body>
    </html>
  );
}