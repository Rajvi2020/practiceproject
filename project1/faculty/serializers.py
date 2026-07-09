from rest_framework import serializers
from .models import Faculty
from accounts.serializers import UserSerializer

class FacultySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Faculty
        fields = '__all__'
        depth = 1
