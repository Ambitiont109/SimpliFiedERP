from django.urls import include, path
from rest_framework import routers
from items.views import ItemViewSet

router = routers.DefaultRouter()
router.register(r'items', ItemViewSet, basename="item")
urlpatterns = [
    path('', include(router.urls))
]
