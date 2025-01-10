'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc, or } from 'firebase/firestore';
import { people } from "../../../utils/peopleList";
import { db } from "../../../utils/firebase";
import "../../../styles/globals.css";

const PersonProfile = () => {
    const { name } = useParams();
    const person = people.find((p) => p.name === name);
    const [duties, setDuties] = useState([]);

    useEffect(() => {
        const fetchDuties = async () => {
            const q = query(
                collection(db, 'duties'),
                or(
                    where('person', '==', name),
                    where('assignedBy', '==', person.email)
                )
            );
            const querySnapshot = await getDocs(q);
            const dutiesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDuties(dutiesList);
        };

        fetchDuties();
    }, [name, person.email]);   

    const deleteDuty = async (id) => {
        await deleteDoc(doc(db, 'duties', id));
        setDuties(duties.filter(duty => duty.id !== id));
    };

    if (!person) {
        return <p>Person not found</p>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-heading">{person.user}'s Profile</h1>
            <p className="profile-email">Email: {person.email}</p>
            <h2 className="duties-heading">Duties:</h2>
            <ul className="duties-list">
                {duties.map((duty, index) => (
                    <li key={index} className="duty-item">
                        <strong className="duty-title">{duty.title}</strong> 
                        <span className="duty-content">{duty.content}</span>
                        <span>{duty.time}</span>
                        <button className="delete-button" onClick={() => deleteDuty(duty.id)}>Sil</button>
                    </li>
                ))}
            </ul>
            {/* Add more profile details here */}
        </div>
    );
};

export default PersonProfile;
