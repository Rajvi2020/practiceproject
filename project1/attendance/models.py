from django.db import models
from students.models import Student
from faculty.models import Faculty

class ClassSession(models.Model):
    course_name = models.CharField(max_length=100)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    date = models.DateField()
    time_in = models.TimeField()
    
    def __str__(self):
        return f"{self.course_name} - {self.date}"

class AttendanceRecord(models.Model):
    session = models.ForeignKey(ClassSession, on_delete=models.CASCADE, related_name='attendance_records')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=(('Present', 'Present'), ('Absent', 'Absent'), ('Late', 'Late')))
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} - {self.status}"
