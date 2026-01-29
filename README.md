# UIT Club Management System

A modern, full-stack web application designed for the **UIT Club** to manage its community, articles, events, and membership. The project features a premium UI/UX design, real-time data management, and a powerful admin dashboard.

---

## 🚀 Key Features

### **Public Pages**
- **✨ Stunning Hero Section**: Animated backgrounds, floating gradient orbs, and glassmorphism stats.
- **📚 Knowledge Hub**: A dynamic blog system for sharing articles, research, and club updates.
- **📅 Events Calendar**: Integrated event management showing upcoming and past activities with registration tracking.
- **👥 Team Showcase**: Professional profiles of club leadership with interactive social links.
- **✍️ Membership Applications**: A sleek "Join Us" form for prospective members.

### **Admin Dashboard**
- **📊 Analytics Overview**: High-level statistics on members, events, and articles.
- **📝 Content Management**: Full CRUD operations for Articles and Events.
- **🤝 Application Management**: Review membership applications with a global toggle to open/close recruitment.
- **📥 Data Portability**: Export applications, team members, and event registrations to **CSV** format.
- **🔒 Secure Authentication**: Robust JWT-based login and password hashing.

---

## 🛠️ Tech Stack

### **Frontend**
- **React (v19)**: Latest features for high-performance UI.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS (v4)**: Next-generation styling with modern layout capabilities.
- **Lucide React**: Clean and consistent iconography.
- **React Router**: Seamless client-side navigation.

### **Backend**
- **Node.js & Express**: Scalable server architecture.
- **PostgreSQL**: Reliable relational database for structured data.
- **Security Suite**: 
  - `jsonwebtoken`: Secure user sessions.
  - `bcryptjs`: Industry-standard password hashing.
  - `helmet` & `xss-clean`: Protection against common web vulnerabilities.
  - `express-rate-limit`: Prevents brute-force attacks.

---

## ⚙️ Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (running locally or a cloud instance)

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd blog
   ```

2. **Backend Setup**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and configure:
     ```env
     PORT=5000
     DATABASE_URL=postgres://user:password@localhost:5432/uit_club
     JWT_SECRET=your_super_secret_key
     ```
   - Run the server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   - Navigate to the frontend folder (from root):
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file:
     ```env
     VITE_API_BASE_URL=http://localhost:5000/api/v1
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

---

## 📁 Project Structure

```text
blog/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handling logic
│   │   ├── models/         # Database schemas/queries
│   │   ├── routes/         # API endpoints
│   │   └── services/       # Business logic (Optional)
│   └── server.js           # App entry point
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Full page views
│   │   ├── services/       # API call wrappers (Axios)
│   │   └── index.css       # Tailwind & custom animations
│   └── vite.config.js      # Build configuration
└── README.md
```

---

## 🎨 UI/UX Design System
The project follows a **Premium Aesthetic** design language:
- **Colors**: Deep Indigo/Blue gradients with Purple accents.
- **Effects**: Glassmorphism (Backdrop blur), floating particles, and staggered animations.
- **Typography**: Inter / Sans-serif for maximum readability.
- **Interactivity**: Micro-animations on hover, scroll-triggered visibility, and smooth state transitions.

---

## 📄 License
This project is licensed under the **ISC License**.
