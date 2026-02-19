from django.urls import path
from .views import *

urlpatterns = [
    path("products/", product_list),
    path("products/create/", product_create),

    path("auth/register/", register),

    #cart apis
    path('add-to-cart/', add_to_cart),
    path('get-cart/', get_cart),
    path('update-cart/<int:pk>/', update_cart),
    path("delete-cart/<int:pk>/", delete_cart_item),


    # product
    path("products/<int:pk>/", product_detail),
]