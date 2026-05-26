from django.db import models

class EmissionRecord(models.Model):
    SOURCE_CHOICES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
        ('APPROVED', 'APPROVED'),
    ]

    STATUS_CHOICES = [
        ('SUCCESS', 'SUCCESS'),
        ('FAILED', 'FAILED'),
        ('REVIEW', 'REVIEW'),
        ('APPROVED', 'APPROVED'),
    ]

    source = models.CharField(max_length=50, choices=SOURCE_CHOICES)

    category = models.CharField(max_length=100)

    raw_value = models.FloatField()

    normalized_value = models.FloatField(null=True, blank=True)

    raw_unit = models.CharField(max_length=50)

    normalized_unit = models.CharField(max_length=50)

    is_suspicious = models.BooleanField(default=False)

    status = models.CharField(max_length=50, choices=STATUS_CHOICES)

    approved = models.BooleanField(default=False)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.source} - {self.category}"