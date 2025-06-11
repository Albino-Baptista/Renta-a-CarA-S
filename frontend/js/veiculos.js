const API_VEICULOS = "http://127.0.0.1:8000/api/veiculos/";

document.addEventListener("DOMContentLoaded", listarVeiculos);
document.getElementById("form-veiculo").addEventListener("submit", criarVeiculo);

function listarVeiculos() {
fetch(API_VEICULOS)
    .then(res => res.json())
    .then(data => {
    const lista = document.getElementById("lista-veiculos");
    lista.innerHTML = "";
    data.forEach(v => {
        const item = document.createElement("li");
        item.textContent = `${v.marca} ${v.modelo} (${v.placa}) - ${v.status}`;
        lista.appendChild(item);
    });
    });
}

function criarVeiculo(e) {
e.preventDefault();

const dados = {
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    ano: parseInt(document.getElementById("ano").value),
    placa: document.getElementById("placa").value,
    tipo: document.getElementById("tipo").value,
    diaria: parseFloat(document.getElementById("diaria").value),
};

fetch(API_VEICULOS, {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
})
    .then(() => {
    alert("Veículo cadastrado!");
    istarVeiculos();
    document.getElementById("form-veiculo").reset();
    });
}
