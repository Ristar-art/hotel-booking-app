
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig =  {
  apiKey: "AIzaSyBoCr1BlxtfXdW3gHBxJKIVKMjOdNsDjRw",
  authDomain: "booking-hotel-25ea1.firebaseapp.com",
  projectId: "booking-hotel-25ea1",
  storageBucket: "booking-hotel-25ea1.appspot.com",
  messagingSenderId: "1058852926243",
  appId: "1:1058852926243:web:0b995bcfd315b213be5296",
  measurementId: "G-8Z1LYMBNQ6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, createUserWithEmailAndPassword };



