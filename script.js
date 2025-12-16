import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const path = window.location.pathname;

// LOGIN
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
        alert("Erro: " + error.message);
      });
  });
}

// PROTEÇÃO DO ADMIN
onAuthStateChanged(auth, (user) => {
  const isAdmin = path.endsWith("/admin.html");

  if (!user && isAdmin) {
    window.location.href = "login.html";
  }
});

// LOGOUT
const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}