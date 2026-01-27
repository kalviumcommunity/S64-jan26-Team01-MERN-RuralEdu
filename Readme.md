📚 RuralEdu – Offline‑First Learning Platform for Rural Schools
🚩 Problem Statement
In many rural areas, schools suffer from low or unstable internet connectivity, making most digital learning platforms unusable. Heavy web apps fail to load, videos buffer endlessly, and students lose access to education.

RuralEdu rethinks digital learning as a lightweight, offline‑first web application that works reliably even with poor or no internet.

💡 Solution Overview
RuralEdu is a full‑stack, offline‑first educational platform built using Next.js and cloud‑native technologies.
Students can access lessons, attempt quizzes, and track progress offline, with data automatically syncing when connectivity is restored.

🎯 Key Features
👩‍🎓 Student
Offline access to lessons

Attempt quizzes without internet

Progress saved locally and synced later

Fast loading on low‑bandwidth networks

👨‍🏫 Teacher / Admin
Create and maintain lessons and quizzes

Monitor student learning progress

Use a lightweight, easy-to-use dashboard

🧠 Offline‑First Approach
Service Workers for caching lessons & assets

IndexedDB / LocalStorage for offline data storage

Static Site Generation (SSG) for fast page loads

Background sync when internet becomes available

The application remains usable even in 2G or no‑internet conditions.

🏗 Tech Stack
Frontend & Backend
Next.js (App Router)

TypeScript

Next.js API Routes

Database & Caching
PostgreSQL – primary database

Prisma ORM – type‑safe database access

Redis – caching layer for faster responses

DevOps & Cloud
Docker – containerization

AWS / Azure – cloud deployment

GitHub Actions – CI/CD pipeline

🔄 System Architecture
Browser (Offline‑Capable)
↓
Next.js Frontend (SSG + Service Worker)
↓
Next.js API Routes
↓
Prisma ORM
↓
PostgreSQL Database
↓
Redis Cache
↓
Docker Containers
↓
AWS / Azure Cloud
🗂 Database Design (High Level)
User (Student / Teacher)

Course

Lesson

Quiz

Progress


### Folder Explanation

- **app/**  
  Contains all route‑based files such as pages, layouts, and API routes. This follows the Next.js App Router pattern for better scalability.

- **components/**  
  Stores reusable UI components (buttons, cards, forms, etc.) to keep the UI consistent and maintainable.

- **lib/**  
  Includes utility functions, helper methods, and shared configurations such as database or API helpers.

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Run
```bash
npm install
npm run dev

For Docker:

docker-compose up
🔁 CI/CD
Automated builds and deployments using GitHub Actions

Every push triggers testing and deployment pipeline

🧪 Demo Highlights
App works offline

Progress syncs when internet is restored

Fast loading on low bandwidth

Cloud‑deployed, scalable architecture

🌍 Impact
RuralEdu enables continuous learning without connectivity barriers, making digital education accessible to rural and under‑resourced schools.


