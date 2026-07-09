from django.contrib import admin
from .models import QuestionPaper

@admin.register(QuestionPaper)
class QuestionPaperAdmin(admin.ModelAdmin):
    list_display = ['subject', 'topic', 'difficulty', 'total_marks', 'faculty', 'created_at']
    list_filter = ['difficulty', 'subject']
    search_fields = ['subject', 'topic', 'faculty__user__username']
    ordering = ['-created_at']
