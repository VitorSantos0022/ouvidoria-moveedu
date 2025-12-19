import { auth, db } from "./firebase.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 📦 dados para XLSX
let dadosXLSX = [];

// 🔒 proteger painel
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Faça login para acessar o painel.");
    window.location.href = "login.html";
    return;
  }

  await carregarDados();
});

async function carregarDados() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "Carregando...";
  dadosXLSX = [];

  const q = query(
    collection(db, "manifestacoes"),
    orderBy("data", "desc")
  );

  const snapshot = await getDocs(q);
  lista.innerHTML = "";

  snapshot.forEach(d => {
    const dado = d.data();

    lista.innerHTML += `
      <div class="card">
        <p><b>Nome:</b> ${dado.nome || "-"}</p>
        <p><b>Telefone:</b> ${dado.telefone || "-"}</p>
        <p><b>Relato:</b> ${dado.mensagem || "-"}</p>
        <hr>
      </div>
    `;

    dadosXLSX.push({
      Nome: dado.nome || "",
      Telefone: dado.telefone || "",
      Relato: dado.mensagem || ""
    });
  });
}

// 🔘 BOTÕES
document.getElementById("btnExportar").addEventListener("click", () => {
  if (dadosXLSX.length === 0) {
    alert("Nenhum dado para exportar.");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(dadosXLSX);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Ouvidoria");
  XLSX.writeFile(wb, "ouvidoria.xlsx");
});

document.getElementById("btnLimpar").addEventListener("click", async () => {
  if (!confirm("Tem certeza que deseja apagar TODOS os registros?")) return;

  const snapshot = await getDocs(collection(db, "manifestacoes"));
  snapshot.forEach(async (d) => {
    await deleteDoc(doc(db, "manifestacoes", d.id));
  });

  alert("Registros apagados com sucesso.");
  location.reload();
});

document.getElementById("btnSair").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
