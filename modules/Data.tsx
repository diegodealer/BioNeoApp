import  db  from '../services/firebaseconfig';
import { ref, set, get, update, remove, onValue } from 'firebase/database';

// Example: Write data
set(ref(db, 'cards/' + cardId), {
  title: 'Card Title',
  description: 'Card Description',
});

// Example: Read data
onValue(ref(db, 'cards/'), (snapshot) => {
  const data = snapshot.val();
  // handle data
});