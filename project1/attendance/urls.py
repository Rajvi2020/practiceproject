from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClassSessionViewSet, AttendanceRecordViewSet

router = DefaultRouter()
router.register(r'sessions', ClassSessionViewSet)
router.register(r'attendance-records', AttendanceRecordViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
