from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Product, CartItem
from .serializers import ProductSerializer, CartItemSerializer

from django.contrib.auth.models import User
from rest_framework import status

from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer



@api_view(["GET"])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def product_create(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def register(request):
    username = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=email).exists():
        return Response(
            {"error": "User already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        validate_password(password)
    except ValidationError as e:
        return Response({"error": list(e.messages)}, status=400)
    
    user = User.objects.create_user(
        username=email, 
        email=email,
        password=password,
        first_name = username
    )

    return Response(
        {"message" : "User Created Successfully"},
        status=status.HTTP_201_CREATED
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def cart_list(request):
    items = CartItem.objects.filter(user=request.user)
    serializer = CartItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    Product_id = request.data.get("product_id")
    quantity = request.data.get("quantity", 1)

    try:
        product = Product.objects.get(id=Product_id)
    except Product.DoesNotExist:
        return Response({"errors": "Product not found"}, status=404)
    
    cart_item, created=CartItem.objects.get_or_create(
        user = request.user,
        product = product
    )

    if not created:
        cart_item.quantity += int(quantity)
        cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data)



@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, pk):
    try:
        item = CartItem.objects.get(id=pk, user=request.user)
        item.delete()
        return Response({"message": "Item removed"})
    
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)
    


# PRODUCT DETAIL

@api_view(["GET"])
def product_detail(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

