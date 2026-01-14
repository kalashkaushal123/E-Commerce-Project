from django.urls import path
from .views import product_list, product_create

urlpatterns = [
    path("products/", product_list),
    path("products/create/", product_create),
]