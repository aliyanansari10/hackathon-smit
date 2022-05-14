// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7o_HYvbfzR2ZCP80vYO9xMCi4O_XHY94",
  authDomain: "saylani-mass-training-st-e6095.firebaseapp.com",
  projectId: "saylani-mass-training-st-e6095",
  storageBucket: "saylani-mass-training-st-e6095.appspot.com",
  messagingSenderId: "330091423371",
  appId: "1:330091423371:web:876bf1c98449c42f7fd68e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { storage, app, auth, db };

// export default app;

