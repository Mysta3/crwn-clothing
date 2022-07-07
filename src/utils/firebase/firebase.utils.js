import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
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
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// FIRESTORE //

export const db = getFirestore(); // get db instance

// userDocument creation
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users',userAuth.uid ); // doc(db, 'collections', uniqID);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error){
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;

}