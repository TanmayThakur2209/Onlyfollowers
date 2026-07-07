<h1> 
<img src="https://raw.githubusercontent.com/TanmayThakur2209/Onlyfollowers/refs/heads/master/client/public/assets/mango-fruit-icon.svg"
  width="50"
  />
  OnlyFollowers
</h1>
OnlyFollowers is a full-stack social media platform that enables users to create profiles, share posts with images, interact with other users, and build an online community. The application provides secure authentication, media uploads, personalized user profiles, and a responsive user experience built with modern web technologies.

---

## Features

- Secure JWT Authentication
- User Registration & Login
- Create, Edit, and Delete Posts
- Image Uploads with Cloudinary
- Personalized User Profiles
- Responsive Design
- Protected Routes
- RESTful API Architecture
- MongoDB Database Integration
- Modern React Frontend

---

# Tech Stack

## Frontend

- React
- JavaScript
- React Router
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Multer
- Cloudinary

---

# System Architecture

```
                  Client
                    │
                    ▼
            React Frontend
                    │
          Axios HTTP Requests
                    │
                    ▼
           Express REST API
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
 Authentication   Posts API    Users API
     │              │              │
     └──────────────┼──────────────┘
                    ▼
               MongoDB Atlas
                    │
                    ▼
               Cloudinary
            (Image Storage)
```

---

# Project Structure

```
OnlyFollowers
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   └── assets
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/TanmayThakur2209/OnlyFollowers.git

cd OnlyFollowers
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

Start the backend server

```bash
nodemon server.js
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# How It Works

### 1. Authentication

Users register and log in securely using JWT-based authentication.

---

### 2. User Profiles

Each user has a personalized profile displaying their information and uploaded posts.

---

### 3. Create Posts

Authenticated users can upload images and create posts that are stored in MongoDB while media files are managed by Cloudinary.

---

### 4. Community Interaction

Users can browse posts, explore profiles, and interact through a responsive social media interface.

---

# REST API

## Authentication

| Method | Endpoint | Description |
| :----: | -------- | ----------- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user |

---

## Users

| Method | Endpoint | Description |
| :----: | -------- | ----------- |
| GET | `/api/user/profile` | Get authenticated user's profile |
| PUT | `/api/user/profile` | Update user profile |

---

## Posts

| Method | Endpoint | Description |
| :----: | -------- | ----------- |
| POST | `/api/post/upload` | Create a new post |
| GET | `/api/post` | Retrieve all posts |
| DELETE | `/api/post/:id` | Delete a post |

---

# Security

- Password hashing using bcrypt.js
- JWT-based authentication
- Protected API routes
- Secure image storage with Cloudinary
- Environment variable configuration

---

# Deployment

| Component | Platform |
| --------- | -------- |
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |

---

# Live Demo

The project is deployed and can be accessed through the following link: https://onlyfollowers.vercel.app

---

# License

This project is licensed under the MIT License.

---

# Author

**Tanmay Thakur**

- GitHub: https://github.com/TanmayThakur2209
- LinkedIn: https://www.linkedin.com/in/tanmaythakur22

---

⭐ If you liked this project, consider giving it a star on GitHub.
