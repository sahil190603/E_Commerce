from rest_framework import generics
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework  import viewsets
from .models import CustomUser
from .serializers import UserSerializer


class CustomUserViewset(viewsets.ModelViewSet):
         queryset = CustomUser.objects.all()
         serializer_class = UserSerializer

User = get_user_model()

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['username'] = user.username
        token['email'] = user.email
        token['firstname']= user.first_name
        token['lastname'] = user.last_name
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
     

