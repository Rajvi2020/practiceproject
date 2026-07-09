from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Assignment, Submission
from .serializers import AssignmentSerializer, SubmissionSerializer
from .ai_service import evaluate_submission_ai

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [AllowAny]

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

    @action(detail=True, methods=['post'])
    def ai_evaluate(self, request, pk=None):
        submission = self.get_object()
        
        # Mock AI Evaluation
        evaluation = evaluate_submission_ai(
            assignment_title=submission.assignment.title,
            student_answer=submission.file_url # using file_url as a proxy for answer content
        )
        
        # Update submission with AI grades
        submission.status = 'Graded'
        submission.marks_obtained = evaluation['score']
        submission.feedback = evaluation['feedback']
        submission.save()
        
        return Response({
            "message": "Submission evaluated successfully using AI.",
            "evaluation": evaluation,
            "updated_submission": self.get_serializer(submission).data
        }, status=status.HTTP_200_OK)
