const API_BASE = "http://127.0.0.1:8000/api";

document.addEventListener("DOMContentLoaded", () => {
carregarSelects();
listarAlugueis();
document.getElementById("form-aluguel").addEventListener("submit", criarAluguel);
});

// Carrega os selects de cliente, veículo e funcionário
async function carregarSelects() {
try {
    const [clientes, veiculos, funcionarios] = await Promise.all([
    fetch(`${API_BASE}/clientes/`).then(res => res.json()),
    fetch(`${API_BASE}/veiculos/`).then(res => res.json()),
    fetch(`${API_BASE}/funcionarios/`).then(res => res.json())
    ]);

    preencherSelect('cliente', clientes, 'nome');
    preencherSelect('veiculo', veiculos, 'modelo');
    preencherSelect('funcionario', funcionarios, 'nome');
} catch (error) {
    console.error("Erro ao carregar selects:", error);
    alert("Erro ao carregar dados iniciais. Verifique o console.");
}
}

function preencherSelect(selectId, dados, campoTexto) {
const select = document.getElementById(selectId);
select.innerHTML = '<option value="">Selecione...</option>';

dados.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item[campoTexto];
    select.appendChild(option);
});
}

// Lista todos os aluguéis ativos
async function listarAlugueis() {
try {
    const response = await fetch(`${API_BASE}/alugueis/`);
    if (!response.ok) throw new Error("Erro ao carregar aluguéis");
    
    const alugueis = await response.json();
    const tbody = document.getElementById("lista-alugueis");
    tbody.innerHTML = "";

    alugueis.forEach(aluguel => {
    if (aluguel.status === "ativo") {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${aluguel.id}</td>
        <td>${getNomePorId('cliente', aluguel.cliente)}</td>
        <td>${getNomePorId('veiculo', aluguel.veiculo)}</td>
        <td>${formatarData(aluguel.data_inicio)} - ${formatarData(aluguel.data_fim)}</td>
        <td>${aluguel.valor_total} KZ</td>
        <td>${aluguel.status}</td>
        <td>
            <button onclick="finalizarAluguel(${aluguel.id})" class="btn-finalizar">Finalizar</button>
        </td>
        `;
        tbody.appendChild(tr);
    }
    });
} catch (error) {
    console.error("Erro ao listar aluguéis:", error);
    alert("Erro ao carregar lista de aluguéis");
}
}

// Função auxiliar para pegar nome por ID (simulação - ideal seria ter cache)
function getNomePorId(tipo, id) {
const select = document.getElementById(tipo);
const option = select.querySelector(`option[value="${id}"]`);
return option ? option.textContent : id;
}

// Cria um novo aluguel
async function criarAluguel(event) {
  event.preventDefault();

const form = event.target;
const formData = {
    data_inicio: form.data_inicio.value,
    data_fim: form.data_fim.value,
    valor_total: parseFloat(form.valor_total.value),
    status: "ativo",
    observacoes: form.observacoes.value,
    data_registro: new Date().toISOString(),
    veiculo: parseInt(form.veiculo.value),
    cliente: parseInt(form.cliente.value),
    funcionario: parseInt(form.funcionario.value)
};

try {
    const response = await fetch(`${API_BASE}/alugueis/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(formData)
    });

    // Verifica se a resposta é JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Resposta não-JSON: ${text.substring(0, 100)}...`);
    }

    const data = await response.json();
    
    if (!response.ok) {
    const errorMsg = data.detail || data.message || JSON.stringify(data);
    throw new Error(errorMsg);
    }

    alert(`Aluguel #${data.id} criado com sucesso!`);
    form.reset();
    listarAlugueis();
} catch (error) {
    console.error("Erro completo:", error);
    alert(`Falha ao criar aluguel: ${error.message}`);
}
}
// Finaliza um aluguel
async function finalizarAluguel(id) {
if (!confirm("Tem certeza que deseja finalizar este aluguel?")) return;

try {
    const response = await fetch(`${API_BASE}/alugueis/${id}/`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: "finalizado" })
    });

    if (!response.ok) throw new Error("Erro ao finalizar aluguel");
    
    alert("Aluguel finalizado com sucesso!");
    listarAlugueis();
} catch (error) {
    console.error("Erro ao finalizar aluguel:", error);
    alert("Falha ao finalizar aluguel");
}
}

// Funções auxiliares
function formatarData(dataString) {
const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
return new Date(dataString).toLocaleDateString('pt-AO', options);
}

function validarDatas(inicio, fim) {
return new Date(fim) > new Date(inicio);
}