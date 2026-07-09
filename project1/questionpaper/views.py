from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import QuestionPaper
from .serializers import QuestionPaperSerializer
from .ai_service import generate_question_paper_ai

class QuestionPaperViewSet(viewsets.ModelViewSet):
    queryset = QuestionPaper.objects.all()
    serializer_class = QuestionPaperSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        # Extract data to send to AI
        subject = request.data.get('subject', 'Unknown Subject')
        topic = request.data.get('topic', 'General')
        difficulty = request.data.get('difficulty', 'Medium')
        total_marks = int(request.data.get('total_marks', 100))
        
        # Call the OpenAI mock integration
        ai_generated_content = generate_question_paper_ai(subject, topic, difficulty, total_marks)
        
        # Store the AI generated content in the database model
        # We can append it to the request data or create the object manually
        data = request.data.copy()
        data['file_url'] = "Generated via AI" # Using file_url as a placeholder for content
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Return both the saved instance and the generated content
        response_data = serializer.data
        response_data['ai_content'] = ai_generated_content
        
        headers = self.get_success_headers(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
