from django.db import models
from students.models import Student

class PerformanceMetric(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    evaluation_date = models.DateField(auto_now_add=True)
    feedback = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.student} - {self.subject}"
