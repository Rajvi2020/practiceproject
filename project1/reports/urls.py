from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReportViewSet, CertificateViewSet

router = DefaultRouter()
router.register(r'reports', ReportViewSet)
router.register(r'certificates', CertificateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
