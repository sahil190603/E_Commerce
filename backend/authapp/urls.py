from django.urls import path , include
from rest_framework.routers import DefaultRouter
from .views import UserRegisterView, CustomTokenObtainPairView , CustomUserViewset
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'Users', CustomUserViewset)

urlpatterns = [
     path('', include(router.urls)),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
