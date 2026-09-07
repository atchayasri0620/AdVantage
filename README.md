# AdVantage

AdVantage is a full-stack web application built to manage digital marketing campaigns from creation to performance tracking. The system supports multiple user roles with different responsibilities and provides a secure platform for campaign approval, audience engagement, and ROI monitoring.

## Features

- User authentication using JWT
- Role-based access (Ad Manager, Client, Audience)
- Campaign creation and management
- Campaign approval and rejection
- Campaign analytics (Views & Purchases)
- Dashboard with campaign statistics
- Responsive user interface

## Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL
- JWT
- Maven

### Frontend
- React
- Redux Toolkit
- React Router
- Axios
- Framer Motion

## Project Structure

```
backend/
    controller/
    service/
    repository/
    entity/
    dto/
    security/

frontend/
    components/
    services/
    store/
    pages/
```

## User Roles

### Ad Manager
- View all campaigns
- Approve campaigns
- Reject campaigns
- Delete campaigns
- Monitor campaign performance

### Client
- Create campaigns
- Update own campaigns
- View campaign analytics

### Audience
- Browse active campaigns
- View campaign details
- Simulate campaign purchases

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/AdVantage.git
```

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Database

Create a MySQL database named:

```
advantage_db
```

Update the database credentials in the backend configuration before running the application.

## Screenshots

Add screenshots of:

- Login
- Dashboard
- Campaign Management
- Create Campaign
- Audience View

## Future Improvements

- Email notifications
- Campaign reports
- Charts for analytics
- Cloud deployment
- Real-time notifications

## Author

Harish
