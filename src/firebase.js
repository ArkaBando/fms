import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as fb from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkCefYKT8e6dUFEN1Go1Y0_XzK__mrTLI",
  authDomain: "file-management-system-4500e.firebaseapp.com",
  databaseURL: "https://file-management-system-4500e.firebaseio.com",
  projectId: "file-management-system-4500e",
  storageBucket: "file-management-system-4500e.appspot.com",
  messagingSenderId: "854712030315",
  appId: "1:854712030315:web:c2b2a3f4914b097932cd2e",
  measurementId: "G-SF3VSZ4KW4",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firebaseApp.firestore();

// firebase.analytics();

const provider = new firebase.auth.GoogleAuthProvider();


export const fetchAllFiles = async (parentFolderId = null) => {
  try {
    let querySnapshot = await db
      .collection("files")
      .where("parentFolderId", "==", parentFolderId)
      .get();
    // .then((querySnapshot)=>{
    //   let data = querySnapshot.docs.map((doc) => doc.data());
    //   console.log(data);
    // })

    const data = querySnapshot.docs.map((doc) => doc.data());
    console.log(data);
    return data;
  } catch (e) {
    console.error("Error fetching files", e);
  }
};

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateFileStructure = async (file, fileDetails) => {
  if (!file) return;
  const fileRef = firestore.doc(`files/${file.id}`);
  const snapshot = await fileRef.get();
  if (!snapshot.exists) {
    const { parentFolderId, id, name, type, url } = file;
    try {
      await fileRef.set({
        parentFolderId,
        id,
        name,
        type,
        url,
        time: new Date().getTime(),
        ...fileDetails,
      });
    } catch (error) {
      console.error("Error creating file document", error);
    }
  }
  return getFileDocument(file.id);
};

const getFileDocument = async (id) => {
  if (!id) return null;
  try {
    const fileDocument = await firestore.doc(`files/${id}`).get();
    return {
      id,
      ...fileDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
