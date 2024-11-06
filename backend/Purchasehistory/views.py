# # views.py
# from rest_framework import viewsets, generics
# from rest_framework.response import Response
# from .models import Order
# from .serializers import OrderSerializer
# from E_commerce.models import Product
# from authapp.models import CustomUser
# from rest_framework import status

# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer

# class CreateOrderView(generics.CreateAPIView):
#     serializer_class = OrderSerializer

#     def create(self, request, *args, **kwargs):
#         user_id = request.data.get('user')
#         product_id = request.data.get('product')
#         quantity = request.data.get('quantity')

#         try:
#             user = CustomUser.objects.get(id=user_id)
#             product = Product.objects.get(id=product_id)
            
#             if product.quantity < quantity:
#                 return Response({"message": "Not enough stock available"}, status=status.HTTP_400_BAD_REQUEST)
            
#             order = Order.objects.create(
#                 user=user,
#                 product=product,
#                 quantity=quantity
#             )

#             product.quantity -= quantity
#             product.save()

#             serializer = OrderSerializer(order)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        
#         except CustomUser.DoesNotExist:
#             return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
#         except Product.DoesNotExist:
#             return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)


from rest_framework import viewsets, generics
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer
from E_commerce.models import Product
from authapp.models import CustomUser
from rest_framework import status

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-order_date')
    serializer_class = OrderSerializer

class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user')
        product_id = request.data.get('product')
        quantity = request.data.get('quantity')

        try:
            user = CustomUser.objects.get(id=user_id)
            product = Product.objects.get(id=product_id)

            if product.quantity < quantity:
                return Response({"message": "Not enough stock available"}, status=status.HTTP_400_BAD_REQUEST)

            order = Order.objects.create(
                user=user,
                product=product,
                quantity=quantity
            )

            product.quantity -= quantity
            product.save()

            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except CustomUser.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        except Product.DoesNotExist:
            return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
