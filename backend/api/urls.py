from django.urls import path
from .views import product_list, product_create, register, cart_list, add_to_cart, remove_from_cart, product_detail

urlpatterns = [
    path("products/", product_list),
    path("products/create/", product_create),

    path("auth/register/", register),

    #cart apis
    path("cart/", cart_list),
    path("cart/add/", add_to_cart),
    path("cart/remove/<int:pk>/", remove_from_cart),

    # product
    path("products/<int:pk>/", product_detail),
]