import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// LOGIN
window.login = function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      window.location.href = "admin.html";
    })
    .catch(error => {
      alert("Erro: " + error.message);
    });
};

// LOGOUT
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

// PROTEÇÃO DE PÁGINA (ADMIN)
onAuthStateChanged(auth, (user) => {
  const pagina = window.location.pathname;

  if (pagina.includes("admin.html") && !user) {
    window.location.href = "login.html";
  }
});