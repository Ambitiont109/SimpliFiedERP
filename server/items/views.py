import django_filters.rest_framework
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'location']
    ordering_fields = ['name', 'quantity']
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
