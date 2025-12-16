import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        window.location.href = "admin.html";
      })
      .catch((error) => {
        alert("Erro ao entrar: " + error.message);
      });
  });
}

// Proteção do admin
onAuthStateChanged(auth, (user) => {
  if (window.location.pathname.includes("admin.html") && !user) {
    window.location.href = "index.html";
  }
});