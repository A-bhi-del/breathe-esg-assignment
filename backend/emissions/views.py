from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import EmissionRecord
from .serializers import EmissionRecordSerializer

import pandas as pd


@api_view(['GET'])
def get_emissions(request):

    records = EmissionRecord.objects.all()

    serializer = EmissionRecordSerializer(records, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def upload_csv(request):

    file = request.FILES.get('file')

    if not file:
        return Response({"error": "No file uploaded"})

    df = pd.read_csv(file)

    for _, row in df.iterrows():

        is_suspicious = False

        # suspicious checks

        if row['raw_value'] < 0:
            is_suspicious = True

        if pd.isna(row['raw_unit']) or row['raw_unit'] == '':
            is_suspicious = True

        if row['raw_value'] > 10000:
            is_suspicious = True

        EmissionRecord.objects.create(
            source=row['source'],
            category=row['category'],
            raw_value=row['raw_value'],
            normalized_value=row['raw_value'],
            raw_unit=row['raw_unit'],
            normalized_unit=row['raw_unit'],
            status='REVIEW' if is_suspicious else 'SUCCESS',
            approved=False,
            is_suspicious=is_suspicious
        )

    return Response({"message": "CSV uploaded successfully"})


@api_view(['POST'])
def approve_record(request, id):

    try:
        record = EmissionRecord.objects.get(id=id)

        record.approved = True
        record.status = 'SUCCESS'
        record.is_suspicious = False

        record.save()

        return Response({"message": "Record approved"})

    except EmissionRecord.DoesNotExist:

        return Response({"error": "Record not found"})


@api_view(['POST'])
def reject_record(request, id):

    try:
        record = EmissionRecord.objects.get(id=id)

        record.approved = False
        record.status = 'FAILED'

        record.is_suspicious = True

        record.save()

        return Response({"message": "Record rejected"})

    except EmissionRecord.DoesNotExist:

        return Response({"error": "Record not found"})