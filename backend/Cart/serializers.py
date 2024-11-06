
from rest_framework import serializers
from .models import Cart
from E_commerce.models import Product

class CartSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'quantity']

