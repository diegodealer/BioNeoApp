import { doc, setDoc, getDocs, updateDoc, collection } from 'firebase/firestore';
import { db, rtdb } from './firebaseconfig';
import { ref, push, set, get, update, remove } from 'firebase/database';


// ----------------------- usuarios -----------------------

// Crear (insertar) un nuevo usuario
export async function addUsuario(usuario: any) {
  const usuariosRef = collection(db, 'users');
  const newDocRef = doc(usuariosRef);
  await setDoc(newDocRef, usuario);
  return newDocRef.id;
}

// Leer todos los usuarios
export async function getUsuarios() {
  const usuariosRef = collection(db, 'users');
  const snapshot = await getDocs(usuariosRef);
  return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
}

// Actualizar un usuario existente
export async function updateUsuario(id: string, updates: any) {
  const usuarioRef =  doc(db, `users/${id}`);
  await updateDoc(usuarioRef, updates, id);
}

// ----------------------- plantas -----------------------
// Crear (insertar) una nueva planta
export async function addPlanta(planta: any) {
  const plantasRef = ref(rtdb, 'Plantas');
  const newRef = push(plantasRef);
  await set(newRef, planta);
  return newRef.key;
}

// Leer todas las plantas
export async function getPlantas() {
  const plantasRef = ref(rtdb, 'Plantas');
  const snapshot = await get(plantasRef);
  const data = snapshot.val();
  if (!data) return [];
  return Object.keys(data).map(id => ({ id, ...data[id] }));
}

// Actualizar una planta existente
export async function updatePlanta(id: string, updates: any) {
  const plantaRef = ref(rtdb, `Plantas/${id}`);
  await update(plantaRef, updates);
}

// Borrar una planta
export async function deletePlanta(id: string) {
  const plantaRef = ref(rtdb, `Plantas/${id}`);
  await remove(plantaRef);
}