import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDdJ_ttMXZG6VvMQHvgDfiiJDdorqitnGc',
  authDomain: 'realtime-chatting-78ada.firebaseapp.com',
  projectId: 'realtime-chatting-78ada',
  storageBucket: 'realtime-chatting-78ada.appspot.com',
  messagingSenderId: '934972727949',
  appId: '1:934972727949:web:cf839e8040d9382f3778c4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function getUserAuth() {
  return auth;
}

function getCollection(collectionName) {
  return collection(db, collectionName);
}

async function addDatas(collectionName, addObj) {
  await addDoc(getCollection(collectionName), addObj);
}

function getQuery(collectionName, options) {
  const { orders = [], limits } = options;

  const collect = getCollection(collectionName);
  let q = query(collect);

  orders.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || 'asc'));
  });

  q = query(q, limit(limits));

  return q;
}

async function getDatas(collectionName, setData) {
  const q = query(
    getCollection(collectionName),
    orderBy('createdAt'),
    limit(100)
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    setData(data);
  });

  return unsub;
}

export { addDatas, getDatas, getQuery, getUserAuth };
