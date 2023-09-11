# Smplified ERP Item Management System

Simple Item Management System that can Create, Update, Delete, Sort, Filter, and Search.
### Used
- `django-restframework`, `django-filter` in backend. 
- `notistack` for notification in frontend
- `tailwindcss` for mobile responsive
### Created Reusable Component
- `Form`, `Input` components with `react-hook-form`
- `PaginationButton`, `SearchInput`, `SortButton`, `MultiRangeSlider` components with `tailwindcss`
### Screen shots
![SignIn](https://raw.githubusercontent.com/Ambitiont109/SimpliFiedERP/master/screenshots/login.png)
![List](https://raw.githubusercontent.com/Ambitiont109/SimpliFiedERP/master/screenshots/list.png)
![Edit](https://raw.githubusercontent.com/Ambitiont109/SimpliFiedERP/master/screenshots/edit.png)

---

## Features

- Dockerized Django backend .
- Dockerized Next.js frontend.
- One-command setup and launch with `docker-compose`.

---

## Installation and Setup

### Prerequisites:

- Ensure Docker and `docker-compose` are installed on your machine.

### Steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ambitiont109/SimpliFiedERP.git
2. **Navigate to the project directory**:
   ```bash
   cd SimpliFiedERP
3. **Build and run the project using docker-compose:**:
   ```bash
   docker-compose up -d

## Usage
### Run Pytest:
Check if backend pass all the test.
```bash
docker-compose exec server pytest
```

### Running Project:
Once you've followed the installation steps, the Django server and Next.js frontend should be up and running. Access the frontend at http://localhost:3000 and the backend API (if exposed) at http://localhost:8000.

### Running Migrations
To apply Django migrations:
```bash
docker-compose exec server python manage.py migrate
```

### Creating Superuser:
To create a Django superuser for the admin site:
```bash
docker-compose exec server python manage.py createsuperuser
```

### Loading Fixture Data:
To load the fixture data to initiate the Item data:
```bash
docker-compose exec server python manage.py loaddata items/fixtures/item_model_fixture.json
```