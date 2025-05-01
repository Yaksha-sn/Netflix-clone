
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';


const firebaseConfig = {
    apiKey: "AIzaSyB5nu2BOVeRWIvSKPLmedS1XLm1VP2_874",
    authDomain: "netflix-clone-29d54.firebaseapp.com",
    projectId: "netflix-clone-29d54",
    storageBucket: "netflix-clone-29d54.firebasestorage.app",
    messagingSenderId: "90889445824",
    appId: "1:90889445824:web:beea5af639d3a9dc996825",
    measurementId: "G-YZLMNQXSET"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {


        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}
const logout = () => {
    signOut(auth);
}
export { auth, db, login, signup, logout };