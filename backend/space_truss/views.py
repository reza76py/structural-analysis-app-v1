# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Node
# from .serializers import NodeSerializer

# class NodeAPIView(APIView):
#     def get(self, request):
#         nodes = Node.objects.all()
#         serializer = NodeSerializer(nodes, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request):
#         serializer = NodeSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)









from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Node
from .serializers import NodeSerializer

class NodeAPIView(APIView):
    def get(self, request):
        nodes = Node.objects.all()
        serializer = NodeSerializer(nodes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = NodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, node_id):
        node = get_object_or_404(Node, id=node_id)
        node.delete()
        return Response({"message": "Node deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
