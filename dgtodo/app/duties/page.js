'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore'; // Import Firestore methods
import '../../styles/globals.css';
import { db } from '../../utils/firebase';

const DutiesPage = () => {
    const [duties, setDuties] = useState([]);
    const [selectedDuty, setSelectedDuty] = useState(null);

    const fetchDuties = async () => {
        const q = query(collection(db, 'duties'), orderBy('time', 'desc'));
        const querySnapshot = await getDocs(q);
        const dutiesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dutiesList.sort((a, b) => new Date(b.time) - new Date(a.time));
        setDuties(dutiesList);
    };

    useEffect(() => {
        fetchDuties();
    }, []);

    const handleDutyClick = (duty) => {
        setSelectedDuty(duty);
    };

    const closeModal = () => {
        setSelectedDuty(null);
    };

    return (
        <div className="profile-container">
            <h1 className="profile-heading">Mevcut Görevler</h1>
            <button className="refresh-button" onClick={fetchDuties}>Yenile</button>
            <ul className="duties-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                {duties.map((duty, index) => (
                    <li key={index} className="duty-item" onClick={() => handleDutyClick(duty)}>
                        <span className="duty-person"> <span style={{color:"#4CAF50"}}>Atanan Kişi:</span> {duty.person}</span>
                        <span className="duty-assignedBy"> <span style={{color:"#4CAF50"}}>Atayan Kişi:</span> {duty.assignedBy}</span>
                        <span className="duty-assignedBy"> <span style={{color:"#4CAF50"}}>Atandığı Tarih:</span>{duty.time}</span>
                    </li>
                ))}
            </ul>
            {selectedDuty && (
                <div className="modal" onClick={closeModal} style={{width:"20%", height:"20%"}}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <div className='modalItem'>
                            <label>Görev Başlığı:</label>
                            <p>{selectedDuty.title}</p>
                        </div>
                        <div className='modalItem'>
                            <label>Görev İçeriği:</label>
                            <p>{selectedDuty.content}</p>
                        </div>
                        <button className='modalCloseButton' onClick={closeModal}>x</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DutiesPage;
