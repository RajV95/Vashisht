import axiosInstance from "../axios.js";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut
} from "firebase/auth";
// Firebase config (Ensure your .env file contains the correct keys)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// import { signInWithPopup, signOut, getIdToken } from "firebase/auth";
// import { auth, provider } from "../firebaseConfig";
// import axiosInstance from "../utils/axios";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const { uid, email } = result.user;

    // ✅ Get Firebase ID Token
    const idToken = await result.user.getIdToken();  
    // console.log("Idtoken:", idToken);

    // Send token to backend for authentication
    const resp = await axiosInstance.post('/api/user/register', { uid, email });

    if (resp.status === 201) {
      const mess_id = prompt("Enter your Mess ID:");
      if (!mess_id) {
        alert("Mess ID is required to proceed.");
        return;
      }

      // Send token when inserting mess_id
      await axiosInstance.post('/api/user/insert-mess', { uid, email, mess_id });
      console.log("Mess ID registered successfully.");
    } else {
      console.log("User logged in successfully.");
    }

    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error.response ? error.response.data : error.message);
    throw error;
  }
};





export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};