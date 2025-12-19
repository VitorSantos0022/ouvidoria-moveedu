import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBphT72hcN0MJlCmjiNyKOwECoGuNLymrc",
  authDomain: "ouvidoria--moveedu.firebaseapp.com",
  projectId: "ouvidoria--moveedu"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 📦 array GLOBAL para exportação
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
  lista.innerHTML = "<p>Carregando...</p>";
  dadosXLSX = [];

  const q = query(
    collection(db, "manifestacoes"),
    orderBy("data", "desc")
  );

  const snapshot = await getDocs(q);

  lista.innerHTML = "";

  snapshot.forEach(doc => {
    const d = doc.data();

    lista.innerHTML += `
      <div class="card">
        <p><strong>Nome:</strong> ${d.nome || "-"}</p>
        <p><strong>Telefone:</strong> ${d.telefone || "-"}</p>
        <p><strong>Relato:</strong> ${d.mensagem || "-"}</p>
        <p><strong>O que mais gosta:</strong> ${d.gosta || "-"}</p>
        <hr>
      </div>
    `;

    // ✅ dados prontos para Excel
    dadosXLSX.push({
      Nome: d.nome || "",
      Telefone: d.telefone || "",
      Relato: d.mensagem || "",
      "O que mais gosta na escola": d.gosta || ""
    });
  });
}

// 📤 EXPORTAR XLSX (AGORA FUNCIONA)
document.getElementById("btnExportar").addEventListener("click", () => {
  if (dadosXLSX.length === 0) {
    alert("Nenhum dado para exportar.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(dadosXLSX);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Ouvidoria");

  XLSX.writeFile(workbook, "ouvidoria.xlsx");
});

function limparTudo() {
  if (confirm("Tem certeza que deseja apagar TODOS os registros da ouvidoria?")) {
    db.collection("ouvidoria").get().then(snapshot => {
      snapshot.forEach(doc => {
        db.collection("ouvidoria").doc(doc.id).delete();
      });
      alert("Todos os registros foram apagados com sucesso.");
    });
  }
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
