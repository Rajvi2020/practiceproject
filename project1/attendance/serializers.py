from rest_framework import serializers
from .models import ClassSession, AttendanceRecord

class ClassSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassSession
        fields = '__all__'

class AttendanceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceRecord
        fields = '__all__'
        depth = 2
