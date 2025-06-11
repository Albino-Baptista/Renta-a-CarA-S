// frontend/js/api.js

const API_BASE_URL = 'http://localhost:8000/api'; // Altere para sua URL da API

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  async request(endpoint, method = 'GET', body = null) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
  }

  // Métodos específicos para o dashboard
  async getDashboardData() {
    return this.request('/dashboard/');
  }

  async getRecentRentals() {
    return this.request('/alugueis/recentes/');
  }

  async getFleetStatus() {
    return this.request('/veiculos/status/');
  }
}

const api = new ApiClient();
export default api;