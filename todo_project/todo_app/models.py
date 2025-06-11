from django.db import models

class Funcionario(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=255)
    
    CARGO_CHOICES = [
        ('admin', 'Administrador'),
        ('funcionario', 'Funcionário'),
    ]
    cargo = models.CharField(max_length=20, choices=CARGO_CHOICES, default='funcionario')
    data_cadastro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True, null=True, blank=True)
    telefone = models.CharField(max_length=20)
    cpf = models.CharField(max_length=14, unique=True)
    endereco = models.TextField(null=True, blank=True)
    data_cadastro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

class Veiculo(models.Model):
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    ano = models.IntegerField()
    placa = models.CharField(max_length=10, unique=True)

    TIPO_CHOICES = [
        ('hatch', 'Hatch'),
        ('sedan', 'Sedan'),
        ('suv', 'SUV'),
        ('pickup', 'Pickup'),
    ]
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)

    diaria = models.DecimalField(max_digits=10, decimal_places=2)

    STATUS_CHOICES = [
        ('disponivel', 'Disponível'),
        ('alugado', 'Alugado'),
        ('manutencao', 'Manutenção'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='disponivel')

    foto = models.ImageField(upload_to='veiculos/', null=True, blank=True)
    data_cadastro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.placa})"

class Aluguel(models.Model):
    veiculo = models.ForeignKey(Veiculo, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    funcionario = models.ForeignKey(Funcionario, on_delete=models.CASCADE)

    data_inicio = models.DateField()
    data_fim = models.DateField()
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)

    STATUS_CHOICES = [
        ('ativo', 'Ativo'),
        ('finalizado', 'Finalizado'),
        ('cancelado', 'Cancelado'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ativo')

    observacoes = models.TextField(null=True, blank=True)
    data_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Aluguel #{self.id} - {self.veiculo}"
