from django.db import models
from faculty.models import Faculty
from students.models import Student

class Assignment(models.Model):
    title = models.CharField(max_length=200)
    course = models.CharField(max_length=100)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    deadline = models.DateTimeField()
    description = models.TextField(blank=True, null=True)
    assignment_file = models.FileField(upload_to='assignments/', blank=True, null=True)

    def __str__(self):
        return self.title

class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=(('Pending', 'Pending'), ('Submitted', 'Submitted'), ('Graded', 'Graded'), ('Late', 'Late')), default='Pending')
    score = models.CharField(max_length=20, blank=True, null=True)
    feedback = models.TextField(blank=True, null=True)
    originality_score = models.CharField(max_length=20, blank=True, null=True)
    ai_status = models.CharField(max_length=50, blank=True, null=True)
    submission_file = models.FileField(upload_to='submissions/', blank=True, null=True)

    def __str__(self):
        return f"{self.student} - {self.assignment.title}"
