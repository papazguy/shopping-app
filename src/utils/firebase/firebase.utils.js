import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, } from 'firebase/firestore';


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDwNJt2F4oMU-ZAvDMiSIn2OMXunJSvADU",
  authDomain: "crwn-clothing-db-d2e4b.firebaseapp.com",
  projectId: "crwn-clothing-db-d2e4b",
  storageBucket: "crwn-clothing-db-d2e4b.appspot.com",
  messagingSenderId: "143712065793",
  appId: "1:143712065793:web:be5008f3b1c48f0149a300",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    //first get the document reference for example Hat, women, men based on the object title
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);   
  });
   await batch.commit();
   console.log("done");
}

export const getCategoriesAndDocuments = async () => {
  const catecoryCollectionRef = collection(db, 'categories');//returns a ref to category
  const q = query(catecoryCollectionRef); //returns a quaryeable snapshot of all documents in the cateory

  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((accumulator, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  },{});

  return categoryMap;

}

export const createUserDocumentFromAuth = async(
  userAuth,
  additionalProperties = {}
   ) => {
     //get the the document reference for specific user with uid :FeCthoM79qM3G0pYHJ6DLXBCW
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
  //if user does not exist, create da document
  if(!userSnapshot.exists()){
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName, 
        email, 
        createdAt,
        ...additionalProperties,
      });
    } catch(error){
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}


export const checkIfUserExists = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.exists();

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);


}

export const signOutUser = async() => await signOut(auth);


export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);