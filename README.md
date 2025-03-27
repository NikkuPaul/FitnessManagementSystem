# FitPlan - FitnessManagementSystem

A full-stack application for managing workout routines with complete CRUD operations and MongoDB integration.

## Features

- **Workout Management**
  - Create new workouts with details (name, duration, difficulty, etc.)
  - View complete workout details in modal
  - Edit existing workouts
  - Delete workouts
- **Modern UI** with Bootstrap 5
- **RESTful API** backend
- **MongoDB** database storage

## Technologies Used

**Frontend:**
- HTML5
- CSS3 (Bootstrap 5)
- JavaScript

**Backend:**
- Java 11
- Spring Boot 2.7
- MongoDB

## Installation

### Prerequisites
- Java JDK 11+
- Maven
- MongoDB 5.0+

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/NikkuPaul/fitplan.git
   cd fitplan
   
2. Start MongoDB service:
   mongod --dbpath=/your/data/directory

3. Build and run the Spring Boot application:
   mvn clean install
   mvn spring-boot:run

4. Access the application at:
   http://localhost:8080/workouts.html
---------------------------------------------------------------------------------------------
After Open a Web page
 How to Use
View Workouts

All workouts are displayed in a table

Click "View" to see complete details

Add New Workout

Fill out the form

Click "Submit"

Edit Workout

Click "Edit" on any workout

Modify the details

Click "Save Changes"

Delete Workout

Click "Delete" on any workout

Confirm deletion


   
