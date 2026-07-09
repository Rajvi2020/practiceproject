from django.db import models
from django.conf import settings

class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    student_id = models.CharField(max_length=20, unique=True)
    grade = models.CharField(max_length=20)
    section = models.CharField(max_length=10)
    cgpa = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=(('Active', 'Active'), ('Inactive', 'Inactive'), ('Suspended', 'Suspended')), default='Active')

    def __str__(self):
        return self.user.get_full_name() or self.user.username
