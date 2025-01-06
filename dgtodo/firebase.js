import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJUU_YOKWohPO4t5D36ejRPpVj1gd7yzo",
  authDomain: "dg-dashboard-69040.firebaseapp.com",
  projectId: "dg-dashboard-69040",
  storageBucket: "dg-dashboard-69040.appspot.com",
  messagingSenderId: "660874442320",
  appId: "1:660874442320:web:b9706cc5251d819f59c355",
  measurementId: "G-32MVTJNTML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
