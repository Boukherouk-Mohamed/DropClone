import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig ={ 
  apiKey: "AIzaSyAwiOYwOBwZ2HVW9vVPdwaJDb5FHbCt5yY",
  authDomain: "dropbox-clone-bf7ea.firebaseapp.com",
  projectId: "dropbox-clone-bf7ea",
  storageBucket: "dropbox-clone-bf7ea.appspot.com",
  messagingSenderId: "347571693643",
  appId: "1:347571693643:web:47542a429309e3485585ce"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);


export { app, auth,storage,db,provider };
