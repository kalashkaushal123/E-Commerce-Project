from django.urls import path
from .views import product_list, product_create, register

urlpatterns = [
    path("products/", product_list),
    path("products/create/", product_create),

    path("auth/register/", register)
]