import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCJUU_YOKWohPO4t5D36ejRPpVj1gd7yzo",
    authDomain: "dg-dashboard-69040.firebaseapp.com",
    projectId: "dg-dashboard-69040",
    storageBucket: "dg-dashboard-69040.firebasestorage.app",
    messagingSenderId: "660874442320",
    appId: "1:660874442320:web:b9706cc5251d819f59c355",
    measurementId: "G-32MVTJNTML"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
