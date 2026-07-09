from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ClassSession, AttendanceRecord
from .serializers import ClassSessionSerializer, AttendanceRecordSerializer

class ClassSessionViewSet(viewsets.ModelViewSet):
    queryset = ClassSession.objects.all()
    serializer_class = ClassSessionSerializer
    permission_classes = [AllowAny]

class AttendanceRecordViewSet(viewsets.ModelViewSet):
    queryset = AttendanceRecord.objects.all()
    serializer_class = AttendanceRecordSerializer
    permission_classes = [AllowAny]
