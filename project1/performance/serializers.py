from rest_framework import serializers
from .models import PerformanceMetric

class PerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceMetric
        fields = '__all__'
        depth = 1
