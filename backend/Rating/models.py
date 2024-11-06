# from django.db import models
# from authapp.models import CustomUser
# from E_commerce.models import Product
# from Purchasehistory.models import Order


# class Rating(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     order =  models.ForeignKey(Order, on_delete=models.CASCADE)
#     rating = models.FloatField(default=0)

#     def clean(self):
#         if self.rating < 0:
#             self.rating = 0
#         elif self.rating > 5:
#             self.rating = 5

#     def __str__(self):
#         return f"Rating #{self.id} - {self.user.username} - {self.product.name} "

# rating/models.py


from django.db import models
from authapp.models import CustomUser
from E_commerce.models import Product
from  Purchasehistory.models import Order

class Rating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    orders = models.ForeignKey(Order, on_delete=models.CASCADE , related_name='ratings')
    rating = models.FloatField(default=0)
 


    def clean(self):
        if self.rating < 0:
            self.rating = 0
        elif self.rating > 5:
            self.rating = 5

    def __str__(self):
        return f"Rating #{self.id} - {self.user.username} - {self.product.name}"
    

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.product.update_average_rating()