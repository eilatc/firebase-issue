import { initializeApp } from "firebase/app";
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyBz8MFi7NR68rquhhRsJqd2RN1TQrwapAw",
    authDomain: "absolute-backoffice.firebaseapp.com",
    projectId: "absolute-backoffice",
    storageBucket: "absolute-backoffice.firebasestorage.app",
    messagingSenderId: "467648342855",
    appId: "1:467648342855:web:2d7a6be8996051e47efa62",
    measurementId: "G-YXFSQKN9R6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export { functions };
