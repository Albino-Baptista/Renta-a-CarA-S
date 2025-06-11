from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FuncionarioViewSet, ClienteViewSet, VeiculoViewSet, AluguelViewSet

# Criando o router e registrando os ViewSets
router = DefaultRouter()
router.register(r'funcionarios', FuncionarioViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'veiculos', VeiculoViewSet)
router.register(r'aluguer', AluguelViewSet)

# URLs da API determinadas automaticamente pelo router
urlpatterns = [
    path('', include(router.urls)),
]
