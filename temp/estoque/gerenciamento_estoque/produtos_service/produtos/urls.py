from django.urls import path
from . import views

urlpatterns = [
    path('adicionar/', views.adicionar_produto, name='adicionar_produto'),
    path('listar/', views.listar_produtos, name='listar_produtos'),
    path('buscar/<int:produto_id>/', views.buscar_produto, name='buscar_produto'),
]
