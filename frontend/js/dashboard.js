// frontend/js/dashboard.js

import api from './api.js';

document.addEventListener('DOMContentLoaded', async function() {
  try {
    // Carrega todos os dados do dashboard em paralelo
    const [dashboardData, recentRentals, fleetStatus] = await Promise.all([
      api.getDashboardData(),
      api.getRecentRentals(),
      api.getFleetStatus()
    ]);

    // Atualiza os cards de resumo
    updateSummaryCards(dashboardData);
    
    // Preenche a tabela de aluguéis recentes
    populateRecentRentalsTable(recentRentals);
    
    // Configura o gráfico de status da frota
    setupFrotaChart(fleetStatus);
    
    // Atualiza a cada 30 segundos
    setInterval(updateDashboard, 30000);
    
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    showError('Erro ao carregar dados do dashboard');
  }
});

function updateSummaryCards(data) {
  document.getElementById('alugueis-ativos').textContent = data.active_rentals;
  document.getElementById('veiculos-disponiveis').textContent = data.available_vehicles;
  document.getElementById('clientes-ativos').textContent = data.active_customers;
  document.getElementById('receita-mensal').textContent = 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.monthly_revenue);
}

function populateRecentRentalsTable(rentals) {
  const tableBody = document.getElementById('alugueis-recentes');
  tableBody.innerHTML = rentals.map(rental => `
    <tr>
      <td>${rental.id}</td>
      <td>${rental.cliente_nome}</td>
      <td>${rental.veiculo_modelo}</td>
      <td>${new Date(rental.data_inicio).toLocaleDateString('pt-BR')}</td>
      <td>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rental.valor_total)}</td>
    </tr>
  `).join('');
}

let frotaChart = null;

function setupFrotaChart(data) {
  const ctx = document.getElementById('frota-chart').getContext('2d');
  
  if (frotaChart) {
    frotaChart.destroy();
  }
  
  frotaChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Disponível', 'Alugado', 'Manutenção'],
      datasets: [{
        data: [data.disponivel, data.alugado, data.manutencao],
        backgroundColor: [
          '#2ecc71',
          '#e74c3c',
          '#f39c12'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw} veículos`;
            }
          }
        }
      }
    }
  });
}

async function updateDashboard() {
  try {
    const [dashboardData, recentRentals, fleetStatus] = await Promise.all([
      api.getDashboardData(),
      api.getRecentRentals(),
      api.getFleetStatus()
    ]);

    updateSummaryCards(dashboardData);
    populateRecentRentalsTable(recentRentals);
    
    // Atualiza o gráfico com novos dados
    frotaChart.data.datasets[0].data = [
      fleetStatus.disponivel, 
      fleetStatus.alugado, 
      fleetStatus.manutencao
    ];
    frotaChart.update();
    
  } catch (error) {
    console.error('Erro ao atualizar dashboard:', error);
  }
}

function showError(message) {
  const container = document.querySelector('.container');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-error';
  errorDiv.textContent = message;
  container.prepend(errorDiv);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}