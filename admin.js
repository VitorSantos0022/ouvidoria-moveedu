auth.signInWithEmailAndPassword(
'microlinsbraganca2025@gmail.com', senha.value
);


function login(){
auth.signInWithEmailAndPassword(email.value, senha.value)
.then(carregar);
}


function carregar(){
db.collection('ouvidoria').onSnapshot(snap=>{
lista.innerHTML='';
snap.forEach(doc=>{
lista.innerHTML+=`<p>${doc.data().nome} - ${doc.data().mensagem}</p>`;
});
});
}


function exportar(){
db.collection('ouvidoria').get().then(snap=>{
let dados=[];
snap.forEach(d=>dados.push(d.data()));
let ws=XLSX.utils.json_to_sheet(dados);
let wb=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,ws,'Ouvidoria');
XLSX.writeFile(wb,'ouvidoria.xlsx');
});
}