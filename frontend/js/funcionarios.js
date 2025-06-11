const API_URL = "http://127.0.0.1:8000/api/funcionarios/";

document.addEventListener("DOMContentLoaded", listarFuncionarios);
document.getElementById("form-funcionario").addEventListener("submit", criarFuncionario);

function listarFuncionarios() {
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
    const lista = document.getElementById("lista-funcionarios");
    lista.innerHTML = "";
    data.forEach(f => {
        const item = document.createElement("li");
        item.textContent = `${f.nome} (${f.email}) - Cargo: ${f.cargo}`;
        lista.appendChild(item);
    });
    });
}

function criarFuncionario(e) {
e.preventDefault();

const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
    cargo: document.getElementById("cargo").value
};

fetch(API_URL, {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
})
    .then(res => res.json())
    .then(() => {
    alert("Funcionário adicionado!");
    listarFuncionarios();
    document.getElementById("form-funcionario").reset();
    });
}
