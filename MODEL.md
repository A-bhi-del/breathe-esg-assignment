# MODEL
The application uses a rule-based validation system to identify suspicious ESG emission records during CSV ingestion.

## Suspicious Detection Rules

A record is marked suspicious if:

- Emission value is negative
- Emission value exceeds 10000
- Unit field is missing

## Workflow

1. User uploads CSV
2. Backend parses CSV using pandas
3. Validation rules are applied
4. Records are stored in SQLite database
5. Suspicious records are marked with REVIEW status
6. Admin can approve or reject records