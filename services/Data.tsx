import { db } from './firebaseconfig';
import { ref, push, set, get, update, remove } from 'firebase/database';


// Crear (insertar) una nueva planta
export async function addPlanta(planta: any) {
  const plantasRef = ref(db, 'Plantas');
  const newRef = push(plantasRef);
  await set(newRef, planta);
  return newRef.key;
}

// Leer todas las plantas
export async function getPlantas() {
  const plantasRef = ref(db, 'Plantas');
  const snapshot = await get(plantasRef);
  const data = snapshot.val();
  if (!data) return [];
  return Object.keys(data).map(id => ({ id, ...data[id] }));
}

// Actualizar una planta existente
export async function updatePlanta(id: string, updates: any) {
  const plantaRef = ref(db, `Plantas/${id}`);
  await update(plantaRef, updates);
}

// Borrar una planta
export async function deletePlanta(id: string) {
  const plantaRef = ref(db, `Plantas/${id}`);
  await remove(plantaRef);
}