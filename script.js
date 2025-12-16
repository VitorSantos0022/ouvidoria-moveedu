function enviar(){
const nome = nome.value;
const telefone = telefone.value;
const mensagem = mensagem.value;
const gostos = [...document.querySelectorAll('input[type=checkbox]:checked')].map(e=>e.value);


db.collection('ouvidoria').add({nome, telefone, mensagem, gostos, data:new Date()})
.then(()=>alert('Enviado com sucesso!'));
}