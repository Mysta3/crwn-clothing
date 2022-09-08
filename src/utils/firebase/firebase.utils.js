import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithRedirect,
        signInWithPopup,
        signInWithEmailAndPassword, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword,
        signOut,
        onAuthStateChanged 
        } from 'firebase/auth';
import { getFirestore,
         doc,
         getDoc,
         setDoc,
         collection,
         writeBatch,
         query,
         getDocs,
        } from 'firebase/firestore';

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

///////////////////////////////////////
  // FireBase Google Auth //
//////////////////////////////////////

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// FIRESTORE //

///////////////////////////////////////
  // FireStore DB  //
//////////////////////////////////////

// get db instance
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey); // get collectionReference
  const batch = writeBatch(db); // get your batch instance
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); // get doc reference & pass in to point to the correct collection
    batch.set(docRef, object);
  });

  await batch.commit(); // begins firing off batch
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const qry = query(collectionRef); // returns an object that you can get a snapshot from

  const querySnapshot = await getDocs(qry);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  
}
///////////////////////////////////////
  // userDocument creation //
//////////////////////////////////////


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


///////////////////////////////////////
  // USER AUTH FIREBASE //
//////////////////////////////////////

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthEmailandPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);