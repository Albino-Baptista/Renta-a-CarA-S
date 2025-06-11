from rest_framework import viewsets
from .models import Funcionario, Cliente, Veiculo, Aluguel
from .serializers import FuncionarioSerializer, ClienteSerializer, VeiculoSerializer, AluguelSerializer


class FuncionarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para visualizar e editar funcionários.
    Fornece automaticamente as operações 'list', 'create', 'retrieve',
    'update' e 'destroy'.
    """
    queryset = Funcionario.objects.all()
    serializer_class = FuncionarioSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    """
    ViewSet para visualizar e editar clientes.
    """
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class VeiculoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para visualizar e editar veículos.
    """
    queryset = Veiculo.objects.all()
    serializer_class = VeiculoSerializer


class AluguelViewSet(viewsets.ModelViewSet):
    """
    ViewSet para visualizar e editar aluguéis.
    """
    queryset = Aluguel.objects.all()
    serializer_class = AluguelSerializer

