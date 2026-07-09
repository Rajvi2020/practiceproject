from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from attendance.models import AttendanceRecord
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['get'])
    def risk_analysis(self, request, pk=None):
        student = self.get_object()
        
        # Calculate attendance rate
        total_records = AttendanceRecord.objects.filter(student=student).count()
        present_records = AttendanceRecord.objects.filter(student=student, status='Present').count()
        attendance_rate = (present_records / total_records * 100) if total_records > 0 else 100.0

        # Import AI service
        from .ai_service import analyze_student_risk
        
        # Analyze risk using AI mock
        analysis_result = analyze_student_risk(student.student_id, float(student.gpa), attendance_rate)
        
        return Response(analysis_result, status=status.HTTP_200_OK)
