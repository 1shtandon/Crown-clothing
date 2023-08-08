import { 
  doc, 
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  DocumentReference} from "firebase/firestore";
import { User } from "firebase/auth";

import { db } from "./firebase.utils";

export type UserDocObject = {
  userDocRef: DocumentReference,
  exists: boolean
}

export type UserData = {
  displayName?: string,
  email?: string,
  created_at?: Date,
  exists?: boolean
}

export type ObjectToAdd = {
  title: string
}

export type AdditionalInfo = {
  displayName?: string
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInfo = {} as AdditionalInfo) => {
  const { userDocRef, exists } = await getUserDocumentFromAuth(userAuth);

  if (!exists) {
    const { displayName, email } = userAuth;
    const created_at = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, 
        email, 
        created_at, 
        ...additionalInfo});
    } catch (error) {
      console.log("Error creating user:", error);
    }
  }

  const userSnapshot = await getDoc(userDocRef);

  return userSnapshot;
};

export const getUserDocumentFromAuth = async (userAuth: User): Promise<UserDocObject> => {

  if (!userAuth) return {} as UserDocObject;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  const userDocObject = {
    userDocRef: userDocRef,
    exists: userSnapshot.exists()
  }

  return userDocObject;
}

export const getUserDetails = async (userDocRef: DocumentReference): Promise<UserData> => {
  let userData = {
    created_at: undefined,
    displayName: undefined,
    email: undefined,
    exists: false
  } as UserData

  const userSnapshot = await getDoc(userDocRef);
  const data = userSnapshot.data()
  
  userData = {...userData, ...data, exists: userSnapshot.exists()}

  return userData;
}

export const addCollectionAndDocuments = async<T extends ObjectToAdd> (collectionKey: string, objectsToAdd: T[]): Promise<void> => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
}

export const getCollectionAndDocuments = async<T extends ObjectToAdd> (collectionKey: string): Promise<T[]> => {
  const collectionRef = collection(db, collectionKey)
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoriesArray = querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as T)
  
  return categoriesArray;
}