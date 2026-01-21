# 📚 Offline-First Learning Platform (MERN)

An **offline-first, lightweight education web application** built using the **MERN stack** to support students and teachers in **low-bandwidth and rural environments**.

The platform allows teachers to upload lessons and quizzes online, while students can **download once and learn fully offline**, with progress syncing automatically when internet is available.

---

## 🚩 Problem Statement

In rural schools, unstable or low internet connectivity makes most digital learning platforms unusable.  
Heavy applications fail to load, wasting time and limiting access to education.

---

## 💡 Our Solution

We built a **minimal offline-first MERN web app** that:
- Works without internet after first download
- Stores lessons and progress locally
- Syncs only essential data when online
- Uses a simple, student-friendly interface

---

## 👥 User Roles

### 👩‍🏫 Teacher
- Login securely
- Upload text/audio lessons
- Create MCQ quizzes
- View student progress after sync

### 👨‍🎓 Student
- Login securely
- Download lessons once
- Learn fully offline
- Attempt quizzes offline
- Progress auto-saved and synced later

---

## ✨ Key Features

- Offline-first Progressive Web App (PWA)
- Lightweight UI for low-end devices
- IndexedDB for local storage
- Online/offline detection
- Minimal data usage
- Student-friendly design

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- React Router
- PWA (Service Workers)
- IndexedDB
- CSS / Tailwind (minimal)

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication

---

## 🗂️ Project Structure

root/
│
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── config/
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── vite.config.js
│
└── README.md


---

## 🔌 Offline Functionality

- App shell cached using Service Workers
- Lessons and quizzes stored in IndexedDB
- Progress saved locally when offline
- Sync happens automatically when internet is restored

---

## 🔁 Data Synced to Server

- Student ID  
- Lesson ID  
- Completion status  
- Quiz score  

❌ Lesson content is not re-downloaded  
❌ No unnecessary data usage  

---

