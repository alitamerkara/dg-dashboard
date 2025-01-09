'use client';

import { useParams } from 'next/navigation';
import { people } from '@/utils/peopleList';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/firebase'; // Import Firestore instance
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore methods

const PersonProfile = () => {
    const { name } = useParams();
    const person = people.find((p) => p.name === name);
    const [duties, setDuties] = useState([]);

    useEffect(() => {
        const fetchDuties = async () => {
            const q = query(collection(db, 'duties'), where('person', '==', name));
            const querySnapshot = await getDocs(q);
            const dutiesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDuties(dutiesList);
        };

        fetchDuties();
    }, [name]);

    const deleteDuty = async (id) => {
        await deleteDoc(doc(db, 'duties', id));
        setDuties(duties.filter(duty => duty.id !== id));
    };

    if (!person) {
        return <p>Person not found</p>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#333' }}>{person.user}'s Profile</h1>
            <p style={{ color: '#555' }}>Email: {person.email}</p>
            <h2 style={{ color: '#333', marginTop: '20px' }}>Duties:</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {duties.map((duty, index) => (
                    <li key={index} style={{ background: '#f9f9f9', margin: '10px 0', padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                        <strong style={{ color: '#333' }}>{duty.title}</strong>: <span style={{ color: '#555' }}>{duty.content}</span>
                        <span>{duty.time}</span>
                        <button onClick={() => deleteDuty(duty.id)}>Sil</button>
                    </li>
                ))}
            </ul>
            {/* Add more profile details here */}
        </div>
    );
};

export default PersonProfile;
