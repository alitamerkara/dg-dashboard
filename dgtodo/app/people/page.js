'use client';

import { people } from '@/utils/peopleList';
import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '@/utils/firebase'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods

const PeoplePage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");
    const [modifiedPeople, setModifiedPeople] = useState([]);
    const [dutyTitle, setDutyTitle] = useState("");
    const [dutyContent, setDutyContent] = useState("");
    const [dutyPerson, setDutyPerson] = useState("");

    const openModalHandler = (name) => {
        setDutyPerson(name);
        setOpenModal(true);
    };

    const dutyHandler = async () => {
        try {
            await addDoc(collection(db, 'duties'), {
                title: dutyTitle,
                content: dutyContent,
                person: dutyPerson
            });
            setDutyPerson("");
            setDutyTitle("");
            setDutyContent("");
            setOpenModal(false);
            alert("Görev başarıyla eklendi");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handlechange = (e) => {
        setSearch(e.target.value);
        if (e.target.value) {
            const filteredPeople = people.filter((person) =>
                person.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setModifiedPeople(filteredPeople);
        } else {
            setModifiedPeople([]);
        }
    };

    const searchPeople = modifiedPeople.length > 0 ? modifiedPeople : people;

    return (
        <div>
            <h1>People Page</h1>
            <input type="text" value={search} placeholder="Ara..." onChange={handlechange} />
            <div style={{ overflowY: 'scroll', height: '70vh' }}>
                {searchPeople.map((person) => (
                    <div key={person.id} className="personCard">
                        <p>{person.user}</p>
                        <p>{person.email}</p>
                        <Link href={`/people/${person.name}`}>
                           Profile
                        </Link>
                        <button onClick={() => openModalHandler(person.name)}>Görev Ata</button>
                    </div>
                ))}
                {openModal && (
                    <div className="modal">
                        <form className="modalContent">
                            <div className='modalItem'>
                                <label htmlFor="duty">Görev Başlığı:</label>
                                <input type="text" id="duty" name="duty" required value={dutyTitle} onChange={(e) => setDutyTitle(e.target.value)} />
                            </div>
                            <div className='modalItem'>
                                <label htmlFor="dutyContent">Görev İçeriği:</label>
                                <input type="text" id="dutyContent" name="dutyContent" required value={dutyContent} onChange={(e) => setDutyContent(e.target.value)} />
                            </div>
                            <button className='closeButton' onClick={() => setOpenModal(false)}>x</button>
                            <button type="button" onClick={dutyHandler}>Kaydet</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeoplePage;