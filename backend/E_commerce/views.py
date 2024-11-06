from rest_framework import viewsets
from .models import Category,Product
from .serializers import CategorySerializer,ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
   
    queryset = Product.objects.all().order_by('-sold_count')
    serializer_class = ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer





