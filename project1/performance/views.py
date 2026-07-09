from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import PerformanceMetric
from .serializers import PerformanceSerializer

class PerformanceViewSet(viewsets.ModelViewSet):
    queryset = PerformanceMetric.objects.all()
    serializer_class = PerformanceSerializer
    permission_classes = [AllowAny]
