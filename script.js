import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// CONTROLE DE ACESSO
onAuthStateChanged(auth, (user) => {

  // Se estiver logado e estiver no index → manda pro admin
  if (user && window.location.pathname.endsWith("index.html")) {
    window.location.href = "admin.html";
  }

  // Se NÃO estiver logado e estiver no admin → manda pro login
  if (!user && window.location.pathname.endsWith("admin.html")) {
    window.location.href = "index.html";
  }
  const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
}
});