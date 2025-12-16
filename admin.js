import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, orderBy, query } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBphT72hcN0MJlCmjiNyKOwECoGuNLymrc",
  authDomain: "ouvidoria--moveedu.firebaseapp.com",
  projectId: "ouvidoria--moveedu"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let dadosExportacao = [];

document.addEventListener("DOMContentLoaded", async () => {
  const lista = document.getElementById("lista");
  const btnExportar = document.getElementById("btnExportar");

  btnExportar.addEventListener("click", () => {
    if (dadosExportacao.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(dadosExportacao);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ouvidoria");
    XLSX.writeFile(wb, "ouvidoria.xlsx");
  });

  const q = query(collection(db, "manifestacoes"), orderBy("data", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const d = doc.data();

    lista.innerHTML += `
      <div class="card">
        <p><strong>Nome:</strong> ${d.nome}</p>
        <p><strong>Telefone:</strong> ${d.telefone}</p>
        <p><strong>O que mais gosta:</strong> ${d.gosta}</p>
        <p><strong>Mensagem:</strong> ${d.mensagem}</p>
        <hr>
      </div>
    `;

    dadosExportacao.push({
      Nome: d.nome,
      Telefone: d.telefone,
      "O que mais gosta na escola": d.gosta,
      Mensagem: d.mensagem
    });
  });
});
