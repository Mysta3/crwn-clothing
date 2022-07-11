import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithRedirect,
        signInWithPopup,
        signInWithEmailAndPassword, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword 
        } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrbTpKbfzaW-TpB32HE19EfL8NxSZFK48",
  authDomain: "crwn-clothing-db-91e22.firebaseapp.com",
  projectId: "crwn-clothing-db-91e22",
  storageBucket: "crwn-clothing-db-91e22.appspot.com",
  messagingSenderId: "357211717353",
  appId: "1:357211717353:web:60bd47418727d0984dfa78"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// FIRESTORE //

// get db instance
export const db = getFirestore();
// userDocument creation
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid ); // doc(db, 'collections', uniqID);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch(error){
      console.log('error creating user', error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthEmailandPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}