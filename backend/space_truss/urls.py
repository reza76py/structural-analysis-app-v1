from django.urls import path
from .views import NodeAPIView

urlpatterns = [
    path("nodes/", NodeAPIView.as_view(), name="node_api"),
    path("nodes/<int:node_id>/", NodeAPIView.as_view(), name="node_delete"),  # Delete node by ID

]
