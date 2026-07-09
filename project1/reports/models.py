from django.db import models
from django.conf import settings

class Report(models.Model):
    title = models.CharField(max_length=200)
    generated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    report_type = models.CharField(max_length=50) # 'academic', 'attendance', 'system'
    file_path = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Certificate(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='certificates')
    title = models.CharField(max_length=200)
    issued_by = models.CharField(max_length=100)
    issue_date = models.DateField(auto_now_add=True)
    certificate_id = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} - {self.student.username}"
