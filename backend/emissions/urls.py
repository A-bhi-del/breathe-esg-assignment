from django.urls import path

from .views import (
    get_emissions,
    upload_csv,
    approve_record,
    reject_record
)

urlpatterns = [
    path('emissions/', get_emissions),
    path('upload/', upload_csv),
    path('approve/<int:id>/', approve_record),
    path('reject/<int:id>/', reject_record),
]