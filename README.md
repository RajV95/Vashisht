# Smart Mess Management System

## Overview
The **Smart Mess Management System** is a web-based platform designed to streamline special item bookings and QR-based order verification. This system enhances the dining experience for students while reducing food wastage through efficient tracking and verification mechanisms.

### 🎥 **Project Demo**  
🔗 **Watch the Video Here:** [Click to Watch](https://drive.google.com/file/d/13ZOVgVFBcLtaX2h_zKebB6yhSfyFMTd-/view?usp=sharing)

- **Frontend:** [Vercel](https://vashisht-frontend-beta.vercel.app)  
- **Admin Panel:** [Vercel](https://vashisht-admin.vercel.app)

## Features
### **Special Item Booking System**
- Students can browse and pre-book available special items.
- Payments are processed online, ensuring a cashless and hassle-free experience.
- A unique **QR code** is generated for each order, which serves as a verification tool.

### **QR-Based Order Verification**
- Mess administrators can scan the QR code to verify and serve the exact items ordered.
- This feature ensures accurate tracking, prevents overproduction, and minimizes wastage.

## Technology Stack
- **Frontend:** React.js, Tailwind CSS, ShadCN
- **Authentication:** Firebase
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Installation & Setup
### **1. Clone the Repository**
```sh
git clone https://github.com/RajV95/Vashisht
cd mess-management
```

### **2. Install Dependencies** in admin, frontend, server
```sh
cd admin
npm install
```
```sh
cd server
npm install
```
```sh
cd frontend
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the project root and add the following environment variables:
```ini
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### **4. Start the Development Server**
```sh
cd server
npm start
```

### **5. Start the Front End**
```sh
cd frontend
npm run dev
```

### **6. Start the Admin**
```sh
cd admin
npm run dev
```

## Future Enhancements
- 🔹 **Integration with UPI payment gateways** to expand payment options using bussiness bank account.
- 🔹 **Integrating Mess change Requests** to automate the process of changing the mess for the students.

## Contributors
- **Ganji RajVardhan** (CS22B2013)
- **Thakur Sai Madan Gopal** (CS22B2023)
- **Gande Ashrith** (CS22B2025)
- **Manaswini** (CS22B2030)
this project aims to simply the process to book special item for IIITDM students.
