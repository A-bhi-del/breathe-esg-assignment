# ESG Emission Review Dashboard

A full-stack ESG emissions review platform built using React and Django REST Framework.

## Features

- CSV file upload
- Automated suspicious row detection
- Approve / Reject workflow
- Search and filters
- Real-time dashboard
- REST API integration
- Loading and empty states
- Modern Tailwind UI

---

## Tech Stack

### Frontend
- React
- Axios
- Tailwind CSS

### Backend
- Django
- Django REST Framework
- Pandas
- SQLite

---

## Project Workflow

1. Upload CSV file
2. Parse emissions data
3. Detect suspicious records
4. Review records
5. Approve or reject entries

---

## API Endpoints

### Get all records
GET
/api/emissions/

### Upload CSV
POST
/api/upload/

### Approve record
POST
/api/approve/<id>/

### Reject record
POST
/api/reject/<id>/

---

## Setup Instructions

### Frontend

cd frontend
npm install
npm run dev

### Backend
cd backend
pip install django djangorestframework django-cors-headers pandas
py manage.py runserver

### Author 
```bash
Abhishek Gupta
```

## Live Demo

Frontend:
https://breathe-esg-assignment-opal.vercel.app/

Backend API:
https://breathe-esg-assignment-j6az.onrender.com