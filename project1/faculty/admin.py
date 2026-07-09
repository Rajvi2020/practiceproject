from django.contrib import admin
from .models import Faculty

@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ['user', 'faculty_id', 'department', 'status']
    list_filter = ['department', 'status']
    search_fields = ['user__username', 'faculty_id']
