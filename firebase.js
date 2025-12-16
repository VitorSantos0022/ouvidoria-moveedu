import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBphT72hcN0MJlCmjiNyKOwECoGuNLymrc",
  authDomain: "ouvidoria--moveedu.firebaseapp.com",
  projectId: "ouvidoria--moveedu",
  storageBucket: "ouvidoria--moveedu.firebasestorage.app",
  messagingSenderId: "928513173800",
  appId: "1:928513173800:web:79c12bcef0919245b4481d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };