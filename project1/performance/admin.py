from django.contrib import admin
from .models import PerformanceMetric

@admin.register(PerformanceMetric)
class PerformanceAdmin(admin.ModelAdmin):
    list_display = ['student', 'subject', 'score', 'evaluation_date']
    list_filter = ['subject']
    search_fields = ['student__user__username', 'subject']
    ordering = ['-evaluation_date']
