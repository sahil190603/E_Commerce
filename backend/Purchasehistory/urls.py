# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'orders', views.OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create-order/', views.CreateOrderView.as_view(), name='create-order'),  # New URL route for creating orders
]
