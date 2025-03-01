from django.urls import path
from .views import NodeAPIView

urlpatterns = [
    path("nodes/", NodeAPIView.as_view(), name="node_api"),
]
