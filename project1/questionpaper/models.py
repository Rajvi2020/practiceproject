from django.db import models
from faculty.models import Faculty

class QuestionPaper(models.Model):
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    topic = models.CharField(max_length=200)
    difficulty = models.CharField(max_length=50)
    total_marks = models.IntegerField(default=100)
    generated_content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} - {self.topic}"
