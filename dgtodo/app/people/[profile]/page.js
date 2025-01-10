"use client"

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from "../../../utils/firebase";
import { people } from "../../../utils/peopleList";
import "../../styles/globals.css";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [duties, setDuties] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const userProfile = people.find((p) => p.email === user.email);
                setProfile(userProfile);
                fetchDuties(user.email);
            } else {
                setUser(null);
                setProfile(null);
                setDuties([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchDuties = async (email) => {
        try {
            const q = query(
                collection(db, 'duties'),
                where('person', '==', email)
            );
            const querySnapshot = await getDocs(q);
            const dutiesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Fetched duties:", dutiesList); // Add logging
            setDuties(dutiesList);
        } catch (error) {
            console.error("Error fetching duties:", error); // Add error logging
        }
    };

    const completeDuty = async (id) => {
        try {
            const dutyDoc = doc(db, 'duties', id);
            await updateDoc(dutyDoc, { status: 'completed' });
            setDuties(duties.filter(duty => duty.id !== id));
        } catch (error) {
            console.error("Error completing duty:", error); // Add error logging
        }
    };

    if (!user || !profile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-heading">{profile.user}'s Profile</h1>
            <p className="profile-email">Email: {profile.email}</p>
            <h2 className="duties-heading">Duties:</h2>
            <ul className="duties-list">
                {duties.map((duty, index) => (
                    <li key={index} className="duty-item">
                        <strong className="duty-title">{duty.title}</strong> 
                        <span className="duty-content">{duty.content}</span>
                        <span>{duty.time}</span>
                        <button className="complete-button" onClick={() => completeDuty(duty.id)}>Tamamla</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfilePage;