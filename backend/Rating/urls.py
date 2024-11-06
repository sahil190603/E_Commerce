

# ratings/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RatingViewset 

router = DefaultRouter()
router.register(r'Ratings', RatingViewset, basename='rating')

urlpatterns = [
    path('', include(router.urls)),
   
]

 #  path('Ratings/<int:pk>/', RatingViewset.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='ratings-detail'),
    #  path('Ratings/user/<int:user_id>/', UserOrderRatingview.as_view(), name='User_Order_rating'), 
    # path('Ratings/user/<int:user_id>/orders/<int:orders_id>/', UserProductRatingView.as_view(), name='user_product_rating'),