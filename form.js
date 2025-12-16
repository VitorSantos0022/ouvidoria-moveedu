import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("ouvidoriaForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value || "Anônimo";
  const mensagem = document.getElementById("mensagem").value;

  await addDoc(collection(db, "manifestacoes"), {
    nome,
    mensagem,
    data: serverTimestamp()
  });

  alert("Mensagem enviada com sucesso!");
  form.reset();
});