import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      email.value,
      senha.value
    ).then(() => {
      window.location.href = "admin.html";
    }).catch(err => alert(err.message));
  });
}

// PROTEÇÃO + LISTAGEM
onAuthStateChanged(auth, async (user) => {
  const lista = document.getElementById("lista");

  if (!user && lista) {
    window.location.href = "login.html";
    return;
  }

  if (user && lista) {
    const q = query(
      collection(db, "manifestacoes"),
      orderBy("data", "desc")
    );

    const snap = await getDocs(q);

    lista.innerHTML = "";

    snap.forEach(doc => {
      const d = doc.data();
      lista.innerHTML += `
        <p><strong>${d.nome}</strong><br>${d.mensagem}</p>
        <hr>
      `;
    });
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