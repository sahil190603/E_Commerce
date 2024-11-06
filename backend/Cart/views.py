from rest_framework import viewsets
from .models import Cart
from .serializers import CartSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]  

    def get_queryset(self):
        user_id = self.request.headers.get('User-ID')  # Get user ID from headers
        if not user_id:
            return Cart.objects.none()
        return Cart.objects.filter(user_id=user_id)

    def create(self, request, *args, **kwargs):
        user_id = request.headers.get('User-ID')  # Get user ID from headers
        if not user_id:
            return Response({"detail": "User ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data.copy()
        data['user'] = user.id  # Set the user ID in the data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        user_id = self.request.headers.get('User-ID')
        user = User.objects.get(id=user_id)
        serializer.save(user=user)
