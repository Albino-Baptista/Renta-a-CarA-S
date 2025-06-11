const API_CLIENTES = "http://127.0.0.1:8000/api/clientes/";

document.addEventListener("DOMContentLoaded", listarClientes);
document.getElementById("form-cliente").addEventListener("submit", criarCliente);

function listarClientes() {
fetch(API_CLIENTES)
    .then(res => res.json())
    .then(data => {
    const lista = document.getElementById("lista-clientes");
    lista.innerHTML = "";
    data.forEach(c => {
        const item = document.createElement("li");
        item.textContent = `${c.nome} - ${c.cpf} - ${c.telefone}`;
        lista.appendChild(item);
    });
    });
}

function criarCliente(e) {
e.preventDefault();

const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    cpf: document.getElementById("cpf").value,
    endereco: document.getElementById("endereco").value
};

fetch(API_CLIENTES, {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
})
    .then(() => {
    alert("Cliente cadastrado!");
    listarClientes();
    document.getElementById("form-cliente").reset();
    });
}
