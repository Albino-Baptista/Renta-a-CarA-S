from rest_framework import serializers
from .models import Funcionario, Cliente, Veiculo, Aluguel

class FuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = '__all__'


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'


class VeiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veiculo
        fields = '__all__'


class AluguelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluguel
        fields = '__all__'
