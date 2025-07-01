// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZhe-c6bShXp-jxWtDHsFRiwT2X60cejE",
    authDomain: "e-shop-vid-7aa4f.firebaseapp.com",
    projectId: "e-shop-vid-7aa4f",
    storageBucket: "e-shop-vid-7aa4f.appspot.com",
    messagingSenderId: "810185430305",
    appId: "1:810185430305:web:be2a7abcee77aead479a60",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp