from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        email = data.get('email', '')
        username = data.get('username') or email
        password = data.get('password', '')
        role = data.get('role', 'student')
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        phone = data.get('phone', '')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            role=role,
            first_name=first_name,
            last_name=last_name,
            phone=phone
        )

        try:
            if role == 'student':
                from students.models import Student
                Student.objects.create(user=user, student_id=f"STU{user.id}", grade="Not Assigned", section="NA")
            elif role == 'faculty':
                from faculty.models import Faculty
                Faculty.objects.create(user=user, faculty_id=f"FAC{user.id}", department="Unassigned")
            # For parents, they don't have a separate profile model yet, they just use the User model.
        except Exception as e:
            # Profile creation failed, but user was created. Log or handle appropriately.
            pass

        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
