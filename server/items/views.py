from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    search_fields = ['name', 'location']
    ordering_fields = ['name', 'quantity', 'location']
    filterset_fields = {'quantity': ['exact', 'lte', 'gte']}
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
