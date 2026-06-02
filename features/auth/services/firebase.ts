import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEqS4HtN6Sx0Efknnp0psje_w_tSs4PHU",
  authDomain: "todolistgrupo1-204f7.firebaseapp.com",
  projectId: "todolistgrupo1-204f7",
  storageBucket: "todolistgrupo1-204f7.firebasestorage.app",
  messagingSenderId: "1084412217848",
  appId: "1:1084412217848:web:efe5493a4f5f586d26ee0d",
  measurementId: "G-1J3VX218H0",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export { app };
