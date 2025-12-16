import { getFirestore, collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { app } from "./firebase.js";

const db = getFirestore(app);

const form = document.getElementById("formOuvidoria");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const gosta = document.getElementById("gosta").value;
  const mensagem = document.getElementById("mensagem").value;

  try {
    await addDoc(collection(db, "manifestacoes"), {
      nome: nome || "Anônimo",
      telefone: telefone || "Não informado",
      gosta: gosta || "Não informado",
      mensagem,
      data: serverTimestamp()
    });

    status.innerText = "Mensagem enviada com sucesso!";
    form.reset();
  } catch (error) {
    status.innerText = "Erro ao enviar.";
    console.error(error);
  }
});
