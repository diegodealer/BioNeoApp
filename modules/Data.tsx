import { db } from '../firebaseConfig'; // Ajusta la ruta a tu config de Firebase
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const COLLECTION = 'cards';

export async function getCards() {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addCard(cardData: any) {
  return await addDoc(collection(db, COLLECTION), cardData);
}

export async function updateCard(id: string, cardData: any) {
  const cardRef = doc(db, COLLECTION, id);
  return await updateDoc(cardRef, cardData);
}

export async function deleteCard(id: string) {
  const cardRef = doc(db, COLLECTION, id);
  return await deleteDoc(cardRef);
}