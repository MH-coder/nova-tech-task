# KYC Management Web App

## Overview

This is a full-stack web application built using **React.js (Material UI) for the frontend, Node.js (Express.js) for the backend, and MongoDB (Mongoose) for data storage**. The application allows users to **register, log in, and submit KYC (Know Your Customer) information**, including document uploads. Admins can **view, approve, or reject KYC submissions**, and a dashboard provides key insights such as the total number of users and KYC statuses.

## Technologies Used

### **Frontend**

- **React.js** with **Material UI** for UI components
- **Axios** for API calls
- **React Router** for navigation
- **Context API** for state management

### **Backend**

- **Node.js (Express.js)** for server-side development
- **MongoDB (Mongoose)** for database management (MongoDB Atlas)
- **JWT** for authentication and role-based access control
- **bcrypt.js** for password hashing
- **Cloudinary** for secure image storage
- **Yup** for request body validation
- **Jest** for unit testing

## Features

### **User Features**

- **Signup/Login** with role-based access (**User/Admin**)
- **Submit KYC Information** (Name, Email, Upload ID document)
- **View KYC Status** (Pending, Approved, Rejected)
- Resubmit KYC if Rejected **_(Additional Feature)_**

### **Admin Features**

- **View List of Users & KYC Status**
- **Approve or Reject KYC Submissions**
- **View KPI Dashboard**
  - Total Users
  - Approved KYCs
  - Rejected KYCs
  - Pending KYCs

## Project Setup

### **1. Clone the Repository**

```sh
 git clone <repository-url>
 cd project-directory
```

### **2. Install Dependencies**

Run the following command in both the `frontend` and `backend` directories:

```sh
npm install
```

### **3. Setup Environment Variables**

Create a `.env` file in the `backend` directory and configure the following variables:

```sh
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

Create a **.env** file in the `frontend` directory and configure the following variables:

```sh
REACT_APP_BACKEND_BASE_URL=<your-backend-url>
```

### **4. Start the Backend Server**

Run the following command inside the `backend` directory:

```sh
npm run dev
```

### **5. Start the Frontend Server**

Run the following command inside the `frontend` directory:

```sh
npm run dev
```

### **6. Running Tests**

To run unit tests for both frontend and backend:

```sh
npm test
```

## API Endpoints

### **Authentication**

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/auth/register | User Signup      |
| POST   | /api/auth/login    | User/Admin Login |

### **User KYC Submission**

| Method | Endpoint | Description           |
| ------ | -------- | --------------------- |
| POST   | /api/kyc | Submit KYC Details    |
| GET    | /api/kyc | Get User's KYC Status |

### **Admin KYC Management**

| Method | Endpoint                   | Description                |     |
| ------ | -------------------------- | -------------------------- | --- |
| GET    | /api/admin/kycs            | Get all KYC Submissions    |     |
| PUT    | /api/admin/kyc-status/\:id | Approve/Reject KYC Request |     |
| GET    | /api/admin/kpis            | Get KPI Data               |     |

### **Users List**

| Method | Endpoint  | Description                   |
| ------ | --------- | ----------------------------- |
| GET    | /api/user | Get all users with KYC status |

## Important Considerations

- **Security:**
  - User passwords are encrypted using **bcrypt.js**.
  - **JWT** is used for secure authentication.
  - All **API requests are validated** using **Yup** to prevent invalid/malicious inputs.
- **Scalability & Code Structure:**
  - Modular folder structure for both **frontend & backend**.
  - **Role-based access control (RBAC)** for secure authorization.
  - **Cloudinary integration** for secure document storage.
- **Testing:**
  - Jest is used to **test APIs and React components**.

## Folder Structure

### **Backend**

```
backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.ts
│   ├── server.ts
├── .env
├── package.json
```

### **Frontend**

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── App.tsx
│   ├── main.tsx
├── .env
├── package.json
```

---

This project is designed to be secure, scalable, and efficient. 🚀
