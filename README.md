DEMO
-------------

You can find the sample Live Demo here...

- **[Live Demo](https://www.youtube.com/watch?v=FcSp03NlpPs)**
- **[Download Raw - Live Demo](https://monfortedental-client.s3.ap-southeast-1.amazonaws.com/livedemo/Live-Demo.mp4)**


WIKI - Documentation
-------------
# Monforte Dental - Online Scheduling System

![Project Logo](http://monfortedental-client.s3-website-ap-southeast-1.amazonaws.com/logo.png)

- [Deployed version](http://monfortedental-client.s3-website-ap-southeast-1.amazonaws.com/)

- [Backend with EKS] - Im sorry I have trouble with setting up external ip to run it online (ONGOING).

## Table of Contents

- [Project Description](#project-description)
- [Installation Instructions](#installation-instructions)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Documentation](#documentation)
- [Contact Information](#contact-information)

## Project Description

Develop a web application for a dental office that allows patients to schedule and manage their appointments online.
    Frontend(React) and Backend(Node.js).

## Installation Instructions

1. **Clone the repository**:

    Using SSH

    ```bash
    git clone git@github.com:michaeljoe-webdev/dental-online-system.git
    cd dental-online-system
    ```

    Using HTTP

    ```bash
    git clone https://github.com/michaeljoe-webdev/dental-online-system.git
    cd dental-online-system
    ```

2. **Install dependencies**:

    For the client side (FRONT-END)

    ```bash
    cd client
    npm install
    ```

    For the client side (BACK-END)

    ```bash
    cd server
    npm install
    ```


3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the necessary environment variables.

    (FRONT-END)
    
    ```bash
    VITE_APP_API_URL=http://127.0.0.1:3000/api
    ```

    (BACK-END)

    ```bash
    ACCESS_TOKEN_SECRET = 'mB8#5zP$7s@W3qL!9oY6rT0iU2wF4eD8gH1jK5lN1'
    PORT = 3000
    NODE_ENV="development"
    ```

4. **Run the project**:
    
    For the client side (FRONT-END)

    ```bash
    npm run dev
    ```

    For the client side (BACK-END)
    ```bash
    nodemon
    ```
5. **Setting up the local database with MySQL**:

    Create a database name `monfortedental_db`
    
    Inside the database `monfortedental_db`, import the `monfortedental_db.sql` located in database folder.
    
    ```bash
    cd mysql
    ```

## Features
- Front End:
    User Interface: Login, Register, Contact, Dashboard, Appointment.

- Back End:
    Server-side: Authentication, Api-limiter, Data Store and Fetch.

## Technologies Used
    Front-end
    - REACT v18.2.0
    - Dependencies ( Vite, Redux, Axios, SweetAlert)
    - AWS S3 Bucket
    - Formsfree

    Back-end
    - Node.js
    - Dependencies ( express, express-rate-limit, dotenv, jsonwebtoken, bcrypt, mysql, knex, nodemon)
    - Docker to create and test the .img.
    - Amazon Elastic Container Registry as container for the .img.
    - Amazon Elastic Kubernetes Service to run the shared container.
    - Lambda and API Gateway for backup server-side.

    Database
    - MySQL
    - Microsoft Workbench
    - Amazon RDS with relational database.
    - Apache24 and HeidiSQL to run query and check stored MySQL database locally.


## Documentation

### System Architecture

Our system architecture is divided into several key components:

**Database Table Schema**

> ![Database Table Schema](https://raw.githubusercontent.com/michaeljoe-webdev/dental-online-system/main/wiki/Table_Schema.png)

The database schema outlines the structure of our database, including the relationships between tables and the types of data stored.

**Interface Flow**

> ![Interface Flow](https://raw.githubusercontent.com/michaeljoe-webdev/dental-online-system/main/wiki/Interface_Flow.png)

The interface flow diagram illustrates how users navigate through the application, highlighting key interfaces and interactions.



## Contact Information
 - monfortemichaeljoe@gmail.com


