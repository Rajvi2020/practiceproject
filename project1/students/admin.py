from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user', 'student_id', 'grade', 'section', 'cgpa']
    list_filter = ['grade', 'section', 'status']
    search_fields = ['user__username', 'student_id']
