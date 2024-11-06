# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.decorators import action
# from rest_framework.views import APIView
# from rest_framework.exceptions import NotFound
# from .models import Rating
# from .serializers import RatingSerializer

# class RatingViewset(viewsets.ModelViewSet):
#     queryset = Rating.objects.all()
#     serializer_class = RatingSerializer
#     permission_classes = [AllowAny]

#     def create(self, request, *args, **kwargs):        
#         data = request.data.copy()
#         serializer = self.get_serializer(data=data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

#     @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
#     def user_ratings(self, request):
#         user = request.user
#         ratings = Rating.objects.filter(user=user)
#         serializer = self.get_serializer(ratings, many=True)
#         return Response(serializer.data)

# class UserProductRatingView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, user_id,order_id ,format=None):
#         try:
#             rating = Rating.objects.get(user_id=user_id, order_id = order_id)
#         except Rating.DoesNotExist:
#             raise NotFound("Rating not found")

#         serializer = RatingSerializer(rating)
#         return Response(serializer.data)

# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from .models import Rating
from .serializers import RatingSerializer

class RatingViewset(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):        
        data = request.data.copy()
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def user_ratings(self, request):
        user = request.user
        ratings = Rating.objects.filter(user=user)
        serializer = self.get_serializer(ratings, many=True)
        return Response(serializer.data)





































# class UserProductRatingView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, user_id, orders_id, format=None):
#         try:
#             rating = Rating.objects.get(user_id=user_id, orders_id=orders_id)
#             serializer = RatingSerializer(rating)
#             return Response(serializer.data)
#         except Rating.DoesNotExist:
#             raise NotFound("Rating not found")

    
# class UserOrderRatingview(APIView):
#     permission_classes = [AllowAny]


#     def get(self, request, user_id, format=None):
#         try:
#             rating = Rating.objects.get(user_id=user_id)
#             serializer = RatingSerializer(rating)
#             return Response(serializer.data)
#         except Rating.DoesNotExist:
#             raise NotFound("Rating not found")