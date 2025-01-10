'use client';

import { people } from '../../utils/peopleList';
import React, { useState } from 'react';
import Link from 'next/link';
import {db} from "../../utils/firebase"
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const PeoplePage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");
    const [modifiedPeople, setModifiedPeople] = useState([]);
    const [dutyTitle, setDutyTitle] = useState("");
    const [dutyContent, setDutyContent] = useState("");
    const [dutyPerson, setDutyPerson] = useState("");
    const [saved, setSaved] = useState("");
    const auth = getAuth();
    const user = auth.currentUser; 
    let currentUserEmail = "";
    if (user) {
        currentUserEmail = user.email;
    }
    const month= [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
    ]

    const openModalHandler = (name) => {
        setDutyPerson(name);
        setOpenModal(true);
    };
    const dutyHandler = async () => {
        try {
            if (dutyTitle !== "" && dutyContent !== "") {
                const currentDate = new Date();
                const formattedDate = `${currentDate.getDate()} ${month[currentDate.getMonth()]} ${currentDate.getFullYear()}
                ${currentDate.getHours()}:${currentDate.getMinutes()>9? currentDate.getMinutes(): "0" + currentDate.getMinutes()}`;
                await addDoc(collection(db, 'duties'), {
                    title: dutyTitle,
                    content: dutyContent,
                    person: dutyPerson,
                    assignedBy: currentUserEmail,
                    time: formattedDate
                });
                setSaved("Görev başarıyla eklendi.");
                setTimeout(() => {
                    setOpenModal(false);
                    setDutyPerson("");
                    setDutyTitle("");
                    setDutyContent("");
                    setSaved("");
                }, 700);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handlechange = (e) => {
        setSearch(e.target.value);
        if (e.target.value) {
            const filteredPeople = people.filter((person) =>
                person.user.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setModifiedPeople(filteredPeople);
        } else {
            setModifiedPeople([]);
        }
    };

    const searchPeople = search.length > 0 ? modifiedPeople : people;

    return (
        <div className="profile-container">
            <h1 className="profile-heading">People Page</h1>
            <input type="text" value={search} placeholder="Ara..." onChange={handlechange} className="search-input" />
            <div style={{ overflowY: 'scroll', height: '70vh', width: '70%', padding:"30px", border:"1px solid #ccc", borderRadius:"10px",}}>
                {searchPeople.length > 0 ? (
                    <ul className="people-list">
                        {searchPeople.map((person) => (
                            <li key={person.id} className="people-item">
                                <strong className="people-title">{person.user}</strong>: <span className="people-content">{person.email}</span>
                                <Link href={`/people/${person.name}`}>
                                    Profile Git
                                </Link>
                                <button onClick={() => openModalHandler(person.user)}>Görev Ata</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-results">Aradığınız kişi bulunamadı.</p>
                )}
                {openModal && (
                    <div className="modal">
                        <form className="modalContent" onSubmit={dutyHandler}>
                            <div className='modalItem'>
                                <label htmlFor="duty">Görev Başlığı:</label>
                                <input type="text" id="duty" name="duty" required value={dutyTitle} onChange={(e) => setDutyTitle(e.target.value)} style={{ textAlign: 'left' }} />
                            </div>
                            <div className='modalItem'>
                                <label htmlFor="dutyContent">Görev İçeriği:</label>
                                <textarea type="text" style={{width:"62%", height:"100px", border:"1px solid #ccc", padding:"10px", fontSize:"0.8rem"}} name="dutyContent" required value={dutyContent} onChange={(e) => setDutyContent(e.target.value)} />
                            </div>
                            <button className='modalCloseButton' onClick={() => setOpenModal(false)}>x</button>
                            <button className='modalSaveButton' type="button" onClick={dutyHandler}>Kaydet</button>
                            <div style={{margin:"10px 0px"}}>{saved}</div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeoplePage;