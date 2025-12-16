import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBphT72hcN0MJlCmjiNyKOwECoGuNLymrc",
  authDomain: "ouvidoria--moveedu.firebaseapp.com",
  projectId: "ouvidoria--moveedu",
  storageBucket: "ouvidoria--moveedu.firebasestorage.app",
  messagingSenderId: "928513173800",
  appId: "1:928513173800:web:79c12bcef0919245b4481d"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth
const auth = getAuth(app);

// Exporta Auth
export { auth };