from django.contrib import admin
from .models import ClassSession, AttendanceRecord

@admin.register(ClassSession)
class ClassSessionAdmin(admin.ModelAdmin):
    list_display = ['course_name', 'faculty', 'date', 'time_in']
    list_filter = ['date']

@admin.register(AttendanceRecord)
class AttendanceRecordAdmin(admin.ModelAdmin):
    list_display = ['session', 'student', 'status', 'timestamp']
    list_filter = ['status']
