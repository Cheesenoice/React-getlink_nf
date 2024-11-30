# Netflix and Chill - Frontend & API

## **Overview**
This project is a React-based frontend application designed to interact with a backend API built with Node.js and Express. It helps users to perform email verification tasks using the **Mail.tm** API.

### **Frontend**
The frontend is a React app that provides:
- A clean interface for users to input email addresses.
- Interaction with the backend to fetch verification links based on email.
- Responsive and user-friendly design with basic routing (via React Router) for pages like the Privacy Policy and Terms of Use.

#### **Features:**
- **Email Input**: Users can enter an email address to receive a verification link.
- **API Interaction**: The frontend sends a POST request to the backend API based on the email input.
- **Responsive Design**: The interface adapts to mobile and desktop devices.
- **Privacy and Terms Pages**: Navigate between privacy policy and terms of use pages.

### **Backend**
The backend is built with **Node.js** and **Express.js**, and it communicates with the **Mail.tm API** to generate verification links based on the provided email.

#### **Features:**
- **POST API Endpoint**: Accepts an email and interacts with Mail.tm API.
- **Error Handling**: Provides error messages if something goes wrong during the API request.

### **Tech Stack:**
- **Frontend**: React, React Router, Vite, CSS Modules
- **Backend**: Node.js, Express, Mail.tm API
- **Deployment**: Vercel (for frontend), your server for backend (optional)
