# RuralEdu
**Offline-First Learning Platform for Rural Schools**

RuralEdu is a specialized educational platform designed to bridge the digital divide by ensuring learning continues even when the internet doesn't.

---

## 📖 Project Overview

### Purpose
RuralEdu is an offline-first educational platform designed for schools in rural and low-connectivity regions.

### Core Idea
The platform allows students and teachers to access learning content even without internet connectivity. It utilizes Progressive Web App (PWA) technology to bridge the gap between digital resources and physical limitations.

### Key Focus
* **Reliability:** Guarantees uptime regardless of network status.
* **Performance:** Optimized for older hardware and slow data speeds.
* **Accessibility:** Simple, lightweight UI for diverse user groups.

---

## 🛠 Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | Handles both Frontend and Backend API routes. |
| **Language** | TypeScript | Ensures type safety for complex offline sync logic. |
| **Persistence** | PostgreSQL + Prisma | Reliable relational data storage and schema management. |
| **Offline Layer** | Service Workers + IndexedDB | Manages asset caching and local browser storage. |
| **Caching** | Redis | Speeds up server-side responses for global content. |
| **Infrastructure** | Docker | Standardizes the dev/prod environment. |

---

## 📡 Offline-First Implementation
*Annotation: This is the core engine of RuralEdu.*

1.  **Service Workers:** Intercept network requests to serve cached content when offline.
2.  **IndexedDB:** Stores heavy educational content (lessons/quizzes) locally, bypassing the 5MB limits of standard LocalStorage.
3.  **Background Sync:** Automatically detects when the user regains 2G/3G connectivity and pushes queued progress to the server.
4.  **Static Site Generation (SSG):** Pre-renders lessons at build time for near-instant loading.

---

## 📂 Project Structure

```text
├── app/              # Next.js App Router (Pages & API Routes)
├── components/       # Reusable UI (Buttons, Cards, Lesson Viewers)
├── lib/              # Database clients (Prisma) and utility functions
├── public/           # PWA Manifest, icons, and static assets
├── prisma/           # Database schema and migrations
└── docker-compose.yml # Container orchestration for PG and Redis
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js:** v18.0 or higher
* **Docker:** Required for running local DB and Cache services
* **npm/yarn:** For dependency management

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kalviumcommunity/S64-jan26-Team01-Next.js-RuralEdu.git
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   ```bash
   cp .env.example .env

   ```

4. **Initialize the Database:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

### Docker Setup
To spin up the entire stack (Next.js, Postgres, Redis) instantly:
```bash
docker-compose up -d
```

---

## 📊 Database Design
* **User:** Stores profiles for Students and Teachers.
* **Course/Lesson:** Hierarchical structure for educational content.
* **Quiz:** Assessment metadata and questions.
* **Progress:** A synchronization-heavy table tracking lesson completion and scores.

---

## 📈 Impact
* **Educational Access:** Removes the "Internet Tax" on education.
* **Target Users:** Rural schools, under-resourced communities, and mobile learners.
* **Inclusivity:** Supports 2G conditions and low-spec mobile devices.

---

## 🛡 License
Distributed under the MIT License. See `LICENSE` for more information.