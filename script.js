import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Identifica página atual
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
        alert("Erro ao entrar: " + error.message);
      });
  });
}

// CONTROLE DE ACESSO (GITHUB PAGES SAFE)
onAuthStateChanged(auth, (user) => {

  const isIndex =
    path.endsWith("/") ||
    path.endsWith("/index.html");

  const isAdmin = path.endsWith("/admin.html");

  // Logado + index → admin
  if (user && isIndex) {
    window.location.href = "admin.html";
  }

  // Não logado + admin → index
  if (!user && isAdmin) {
    window.location.href = "index.html";
  }
});

// LOGOUT
const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
}