/* shared.js — Firebase initialization + helpers
   IMPORTANT: This file must contain ONLY JavaScript.
   No <script> tags, no HTML.
*/

// ---- Firebase Config (paste yours here) ----
const firebaseConfig = {
  apiKey: "AIzaSyD8d03q_WJqS4bxrBISFj1igm87v9qXQ_0",
  authDomain: "livequiz-e864f.firebaseapp.com",
  databaseURL: "https://livequiz-e864f-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "livequiz-e864f",
  storageBucket: "livequiz-e864f.firebasestorage.app",
  messagingSenderId: "869686522658",
  appId: "1:869686522658:web:98e83a44144dcfdbd4eb7b"
};

// ---- Firebase Initialization ----
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ---- Named exports for teacher/student modules ----
export function write(path, value) {
  return db.ref(path).set(value);
}

export function update(path, value) {
  return db.ref(path).update(value);
}

export function onValue(path, callback) {
  return db.ref(path).on("value", snap => callback(snap.val()));
}

export function remove(path) {
  return db.ref(path).remove();
}
