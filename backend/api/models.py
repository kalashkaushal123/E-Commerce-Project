from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    description = models.TextField(blank=True)
    image = models.CharField(max_length=100)

    brand = models.CharField(max_length=100, default="Unknown")
    category = models.CharField(max_length=200, default="General")
    product_type = models.CharField(max_length=200, default="Normal")
    rating = models.FloatField(default=0)

    def __str__(self):
        return self.name


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product =   models.ForeignKey(Product, on_delete=models.CASCADE)
    # image = models.CharField(max_length=100)
    # name = models.CharField(max_length=225)
    # price = models.FloatField()
    quantity = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.user.first_name} - {self.product.name}"


