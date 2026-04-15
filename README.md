# School Management System

A full-stack web application for managing school operations and student results.  
This project includes:
- **Frontend (React + Vite)** → located in `/hiii/new`
- **Backend (Node.js + Express + MongoDB)** → located in `/hello`

---

##  Tech Stack
- **Frontend:** React, HTML, CSS, JavaScript, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT
- **Other Tools:** Nodemailer, Middleware, Utilities

---

##  Folder Structure
School-Management/
│
├── hello/           # Backend (controllers, models, routes, middleware, utils)
│   ├── server.js
│   ├── index.js
│   ├── .env
│   ├── package.json
│   └── ...
│
├── hiii/new/        # Frontend (React app with Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️ Clone the repository
```bash
git clone https://github.com/dadhimatimaa11-afk/School-Management.git
cd School-Management

cd hello
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm start

cd ../hiii/new
npm install
npm run dev

🔑 Features
Student result entry and management

Secure authentication (JWT)

Bulk upload for students and subjects

RESTful APIs for backend

Responsive frontend UI

