from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Report, Certificate
from .serializers import ReportSerializer, CertificateSerializer
from students.models import Student
from attendance.models import AttendanceRecord
from assignments.models import Assignment, Submission

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [AllowAny]  # Dev mode — restrict in production

    @action(detail=False, methods=['get'])
    def academic_summary(self, request):
        """Returns aggregated academic data for charts"""
        from assignments.models import Assignment
        from attendance.models import AttendanceRecord

        total_students = Student.objects.count()
        total_assignments = Assignment.objects.count()
        graded_submissions = Submission.objects.filter(status='Graded').count()
        total_submissions = Submission.objects.count()
        total_records = AttendanceRecord.objects.count()
        present_records = AttendanceRecord.objects.filter(status='Present').count()
        absent_records = AttendanceRecord.objects.filter(status='Absent').count()
        late_records = AttendanceRecord.objects.filter(status='Late').count()

        present_pct = round((present_records / total_records * 100), 1) if total_records > 0 else 85
        absent_pct = round((absent_records / total_records * 100), 1) if total_records > 0 else 10
        late_pct = round((late_records / total_records * 100), 1) if total_records > 0 else 5

        return Response({
            'summary': {
                'total_students': total_students,
                'total_assignments': total_assignments,
                'graded_submissions': graded_submissions,
                'total_submissions': total_submissions,
            },
            'attendance_distribution': [
                {'name': 'Present', 'value': present_pct, 'color': '#10b981'},
                {'name': 'Absent', 'value': absent_pct, 'color': '#ef4444'},
                {'name': 'Late', 'value': late_pct, 'color': '#f59e0b'},
            ]
        })

    @action(detail=False, methods=['get'])
    def performance_summary(self, request):
        """Returns per-subject performance data"""
        from performance.models import PerformanceMetric
        from django.db.models import Avg

        subjects = PerformanceMetric.objects.values('subject').annotate(
            avg_score=Avg('score')
        ).order_by('-avg_score')

        if subjects.exists():
            data = [{'subject': s['subject'], 'score': round(float(s['avg_score']), 1)} for s in subjects]
        else:
            # Fallback demo data
            data = [
                {'subject': 'Mathematics', 'score': 85},
                {'subject': 'Physics', 'score': 78},
                {'subject': 'Chemistry', 'score': 92},
                {'subject': 'English', 'score': 88},
                {'subject': 'CS', 'score': 95},
            ]

        return Response({'performance': data})

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [AllowAny]
