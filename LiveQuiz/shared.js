<!-- shared.js -->
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"></script>

<script>
// PASTE YOUR FIREBASE CONFIG HERE:
const firebaseConfig = {
  apiKey: "AIzaSyD8d03q_WJqS4bxrBISFj1igm87v9qXQ_0",
  authDomain: "livequiz-e864f.firebaseapp.com",
  databaseURL: "https://console.firebase.google.com/project/livequiz-e864f/database/livequiz-e864f-default-rtdb/data/~2F",
  projectId: "livequiz-e864f",
  storageBucket: "livequiz-e864f.firebasestorage.app",
  messagingSenderId: "869686522658",
  appId: "1:869686522658:web:98e83a44144dcfdbd4eb7b"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Utilities
function write(path, value) {
   return db.ref(path).set(value);
}

function update(path, value) {
   return db.ref(path).update(value);
}

function onValue(path, callback) {
   db.ref(path).on("value", snap => callback(snap.val()));
}
</script>
