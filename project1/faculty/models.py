from django.db import models
from django.conf import settings

class Faculty(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='faculty_profile')
    faculty_id = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)
    experience_years = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    status = models.CharField(max_length=20, choices=(('Active', 'Active'), ('On Leave', 'On Leave')), default='Active')

    def __str__(self):
        return self.user.get_full_name() or self.user.username
