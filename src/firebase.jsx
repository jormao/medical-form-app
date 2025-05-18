// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <- Agregado para Firestore
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSg8C7YF23t8YJM9BwwxMQngUH_YQy71w",
  authDomain: "medical-form-app-1ddd2.firebaseapp.com",
  projectId: "medical-form-app-1ddd2",
  storageBucket: "medical-form-app-1ddd2.firebasestorage.app",
  messagingSenderId: "40515286693",
  appId: "1:40515286693:web:de97c1bf7987c9c15cbf4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// ✅ Exporta Firestore para que puedas usarlo en otros archivos
export { db }
export const auth = getAuth(app);         // para autenticación