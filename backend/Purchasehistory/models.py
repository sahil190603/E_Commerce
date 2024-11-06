# from django.db import models
# from authapp.models import CustomUser
# from E_commerce.models import Product

# class Order(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField()
#     order_date = models.DateTimeField(auto_now_add=True)
#     rating = models.PositiveIntegerField(default=0)

#     def __str__(self):
#         return f"Order #{self.id} - {self.user.username} - {self.product.name}"

#     def save(self, *args, **kwargs):
#         if self.pk is None: 
#             self.product.sold_count += self.quantity
#             self.product.save()
#         super().save(*args, **kwargs)




from django.db import models
from authapp.models import CustomUser
from E_commerce.models import Product

class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user.username} - {self.product.name}"

    def save(self, *args, **kwargs):
        if self.pk is None: 
            self.product.sold_count += self.quantity
            self.product.save()
        super().save(*args, **kwargs)

    @property
    def rating(self):
        rating = self.ratings.first()  # Assuming one rating per order
        return rating.rating if rating else 0




