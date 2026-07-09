from rest_framework import serializers
from .models import Assignment, Submission

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()

    class Meta:
        model = Submission
        fields = '__all__'

    def get_student_name(self, obj):
        if obj.student and obj.student.user:
            return f"{obj.student.user.first_name} {obj.student.user.last_name}".strip() or obj.student.user.username
        return f"Student #{obj.student.id}"
