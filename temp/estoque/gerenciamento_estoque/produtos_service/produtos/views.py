from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Produto
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def adicionar_produto(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        produto = Produto.objects.create(
            nome=data['nome'],
            descricao=data['descricao'],
            preco=data['preco']
        )
        return JsonResponse({
            'id': produto.id,
            'nome': produto.nome,
            'descricao': produto.descricao,
            'preco': str(produto.preco),
        }, status=201)

def listar_produtos(request):
    produtos = list(Produto.objects.values())
    return JsonResponse(produtos, safe=False)

def buscar_produto(request, produto_id):
    produto = get_object_or_404(Produto, id=produto_id)
    return JsonResponse({
        'id': produto.id,
        'nome': produto.nome,
        'descricao': produto.descricao,
        'preco': str(produto.preco),
    })
