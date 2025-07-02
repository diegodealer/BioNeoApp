import { doc, setDoc, getDoc, getDocs, updateDoc, collection, deleteDoc } from 'firebase/firestore';
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

// ----------------------- plantas y sensores -----------------------
// Guardar datos de la planta en Firestore y sensores en RTDB
export async function addPlantaCompleta(planta: any, sensores: any) {
  // 1. Guardar datos de la planta en Firestore
  const plantasRef = collection(db, 'plantas');
  const newDocRef = doc(plantasRef);
  await setDoc(newDocRef, planta);
  const plantaId = newDocRef.id;

  // 2. Guardar sensores en RTDB bajo el mismo ID
  const sensoresRef = ref(rtdb, `sensors/${plantaId}`);
  await set(sensoresRef, sensores);

  return plantaId;
}

// Obtener datos de la planta desde Firestore
export async function getPlantaById(plantaId: string) {
  const plantaRef = doc(db, 'plantas', plantaId);
  const snap = await getDoc(plantaRef);
  return snap.exists() ? { id: plantaId, ...snap.data() } : null;
}

// Obtener sensores de una planta desde RTDB
export async function getSensoresByPlantaId(plantaId: string) {
  const sensoresRef = ref(rtdb, `sensors/${plantaId}`);
  const snapshot = await get(sensoresRef);
  return snapshot.exists() ? snapshot.val() : null;
}

// Leer todas las plantas (solo Firestore)
export async function getPlantas() {
  const plantasRef = collection(db, 'plantas');
  const snapshot = await getDocs(plantasRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Actualizar datos de la planta en Firestore
export async function updatePlanta(plantaId: string, updates: any) {
  const plantaRef = doc(db, 'plantas', plantaId);
  await updateDoc(plantaRef, updates);
}

// Actualizar sensores en RTDB
export async function updateSensores(plantaId: string, updates: any) {
  const sensoresRef = ref(rtdb, `sensors/${plantaId}`);
  await update(sensoresRef, updates);
}

// Borrar una planta (Firestore y RTDB)
export async function deletePlanta(plantaId: string) {
  const plantaRef = doc(db, 'plantas', plantaId);
  await deleteDoc(plantaRef);
  const sensoresRef = ref(rtdb, `sensors/${plantaId}`);
  await remove(sensoresRef);
}