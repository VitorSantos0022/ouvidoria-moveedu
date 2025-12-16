import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBphT72hcN0MJlCmjiNyKOwECoGuNLymrc",
  authDomain: "ouvidoria--moveedu.firebaseapp.com",
  projectId: "ouvidoria--moveedu",
  storageBucket: "ouvidoria--moveedu.firebasestorage.app",
  messagingSenderId: "928513173800",
  appId: "1:928513173800:web:79c12bcef0919245b4481d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("formOuvidoria");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "manifestacoes"), {
      nome: form.nome.value || "Anônimo",
      telefone: form.telefone.value || "Não informado",
      mensagem: form.mensagem.value,
      gosta: form.gosta.value || "Não informado",
      data: serverTimestamp()
    });

    status.innerText = "Mensagem enviada com sucesso!";
    form.reset();

  } catch (err) {
    console.error(err);
    status.innerText = "Erro ao enviar.";
  }
});
