// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';

// Tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyAacGDAQMHN7-tOCFONbgSAnOzCUHBTnq4",
  authDomain: "bioneoapp.firebaseapp.com",
  databaseURL: "https://bioneoapp-default-rtdb.firebaseio.com/",
  projectId: "bioneoapp",
  storageBucket: "bioneoapp.appspot.com",
  messagingSenderId: "435838769440",
  appId: "1:435838769440:web:20f692ee2cfc34b62f1f45",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Realtime Database y la exporta
export const db = getDatabase(app);
export const storage = getStorage(app);

// Exporta la instancia de Firebase App
export default firebaseConfig;