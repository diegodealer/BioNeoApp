import { db } from './firebaseconfig';
import { ref, push, get, child } from 'firebase/database';

export async function getCards() {
  const dbRef = ref(db, 'cards');
  const snapshot = await get(dbRef);
  const data = snapshot.val();
  if (!data) return [];
  return Object.keys(data).map(id => ({ id, ...data[id] }));
}

export async function addCard(card: { titulo: string; descripcion: string; imagen: string }) {
  const dbRef = ref(db, 'cards');
  await push(dbRef, card);
}