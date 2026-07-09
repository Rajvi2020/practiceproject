import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project1.settings')
django.setup()

from accounts.models import User
from faculty.models import Faculty
from students.models import Student
from assignments.models import Assignment, Submission
from django.utils import timezone
from datetime import timedelta

def seed():
    print("Clearing old data...")
    Submission.objects.all().delete()
    Assignment.objects.all().delete()
    Student.objects.all().delete()
    Faculty.objects.all().delete()
    User.objects.exclude(username='admin').delete()

    print("Creating users...")
    student_user = User.objects.create_user(username='student@school.edu', email='student@school.edu', password='password', role='student')
    faculty_user = User.objects.create_user(username='faculty@school.edu', email='faculty@school.edu', password='password', role='faculty')
    parent_user = User.objects.create_user(username='parent@school.edu', email='parent@school.edu', password='password', role='parent')

    print("Creating profiles...")
    student = Student.objects.create(user=student_user, student_id='STU001', grade='10', section='A', cgpa=3.8)
    faculty = Faculty.objects.create(user=faculty_user, faculty_id='FAC001', department='Computer Science', experience_years=5, rating=4.8)

    print("Creating assignments...")
    a1 = Assignment.objects.create(
        title='React Advanced Patterns',
        course='Frontend Dev 101',
        faculty=faculty,
        deadline=timezone.now() + timedelta(days=2),
        description='Implement custom hooks and HOCs.'
    )
    a2 = Assignment.objects.create(
        title='Django REST Framework',
        course='Backend Dev 201',
        faculty=faculty,
        deadline=timezone.now() + timedelta(days=5),
        description='Build a CRUD API.'
    )

    print("Creating submissions...")
    Submission.objects.create(
        assignment=a1,
        student=student,
        status='Submitted',
        ai_status='Evaluating'
    )
    Submission.objects.create(
        assignment=a2,
        student=student,
        status='Graded',
        score='95/100',
        feedback='Great job on the serializers.',
        originality_score='98%'
    )

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed()
