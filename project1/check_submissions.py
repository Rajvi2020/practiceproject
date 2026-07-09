import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project1.settings')
django.setup()
from assignments.models import Submission

subs = Submission.objects.all()
print("Total submissions:", subs.count())
for s in subs:
    print(f"ID: {s.id}, File: {s.submission_file}")
