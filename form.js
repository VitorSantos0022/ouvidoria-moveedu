import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBphT72hcN0MJlCmjiNyKOwECoGuNLymrc",
  authDomain: "ouvidoria--moveedu.firebaseapp.com",
  projectId: "ouvidoria--moveedu"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("btnEnviar").addEventListener("click", async () => {
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const gosta = document.getElementById("gosta").value.trim();

  if (!mensagem) {
    alert("Por favor, escreva sua manifestação.");
    return;
  }

  try {
    await addDoc(collection(db, "manifestacoes"), {
      nome,
      telefone,
      mensagem,
      gosta,
      data: serverTimestamp()
    });

    alert("Mensagem enviada com sucesso!");

    // limpar campos
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("mensagem").value = "";
    document.getElementById("gosta").value = "";

  } catch (error) {
    console.error(error);
    alert("Erro ao enviar. Tente novamente.");
  }
});