from .models import Bat, BatGallery
from .serializer import BatSerializers
from rest_framework.decorators import api_view
from rest_framework.decorators import action 
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
  
class HomeModelViewSet(viewsets.ModelViewSet):
    queryset = Bat.objects.all()
    serializer_class = BatSerializers
    authentication_classes= [BasicAuthentication] # only authenticate user & pass
    permission_classes = [AllowAny] 
    
   # API for filtering bats by type
    @action(detail=False, methods=['get'], url_path='types/(?P<type>[^/.]+)')
    def filter_by_type(self, request, type=None):
        bats = Bat.objects.filter(types=type)
        serializer = BatSerializers(bats, many=True, context={'request': request})
        return Response(serializer.data)
    
    # API for fetching all bats (for Home)
    @action(detail=False, methods=['get'], url_path='all')
    def get_all_bats(self, request):
        bats = Bat.objects.all()
        serializer = BatSerializers(bats, many=True, context={'request': request})
        return Response(serializer.data)


# @api_view(['GET'])
# def getType(request,pk):
#       bats = Bat.objects.filter(types=pk)
#       serializers = BatSerializers(bats, many=True)
#       return Response(serializers.data)

