import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCNC5tFVYV1iFZMqG0EKwStWqASUZPMzcM',
  authDomain: 'chat-app-c6e14.firebaseapp.com',
  projectId: 'chat-app-c6e14',
  storageBucket: 'chat-app-c6e14.appspot.com',
  messagingSenderId: '298698800534',
  appId: '1:298698800534:web:b765b64d7efc13c809f1b7',
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

export { addDatas, getQuery, getUserAuth };
