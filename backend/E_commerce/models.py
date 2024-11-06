from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='products/', null=True)
    quantity = models.PositiveIntegerField(choices=[(i, str(i)) for i in range(1, 11)] , null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    categories = models.ManyToManyField(Category , blank=True)
    sold_count = models.PositiveIntegerField(default=0)  
    ratings = models.FloatField(default=0  )

    def __str__(self):
        return self.name
    
    def display_photo(self):
        if self.photo:
            return '<img src="%s" style="max-width: 300px; max-height: 300px;" />' % self.photo.url
        else:
            return '<img src="/static/default_product_image.jpg" style="max-width: 300px; max-height: 300px;" />'

    display_photo.allow_tags = True
    display_photo.short_description = 'Product Photo'


    def update_average_rating(self):
        ratings = self.rating_set.all()
        if ratings.exists():
            average_rating = ratings.aggregate(models.Avg('rating'))['rating__avg']
            self.ratings = average_rating
            self.save()
        else:
            self.ratings = 0
            self.save()




  