📌 Project Overview
This assignment focuses on designing a normalized relational database schema for a project management–style application using PostgreSQL and Prisma ORM.
The goal is to identify core entities, define relationships, apply constraints, run migrations, seed data, and document the design decisions.

🎯 Objectives
Identify core entities and their roles

Design a normalized relational schema (1NF, 2NF, 3NF)

Implement the schema using Prisma

Apply migrations and seed sample data

Verify tables and relationships

Document schema design, constraints, and reflections

🧩 Core Entities & Description
1. User
Represents a registered user of the system.

Can create multiple projects

Acts as the owner of projects

2. Project
Represents an ongoing or completed project.

Belongs to one user

Contains multiple tasks

3. Task
Represents an individual unit of work within a project.

Belongs to one project

Tracks progress using status

(Additional entities like Comment or Team can be added later for scalability.)

🗂️ Schema Design (Prisma)
model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  projects  Project[]
  createdAt DateTime  @default(now())
}

model Project {
  id        Int       @id @default(autoincrement())
  name      String
  userId    Int
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks     Task[]
  createdAt DateTime  @default(now())

  @@index([userId])
}

model Task {
  id        Int       @id @default(autoincrement())
  title     String
  status    String
  projectId Int
  project   Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdAt DateTime  @default(now())

  @@index([projectId])
}
🔑 Keys, Constraints & Relationships
Primary Keys
id in all models (auto‑incremented)

Foreign Keys
Project.userId → User.id

Task.projectId → Project.id

Constraints
email is UNIQUE

Required fields enforced via Prisma defaults

ON DELETE CASCADE ensures dependent records are removed automatically

Indexes
Indexed foreign keys (userId, projectId) for faster queries

🔗 Relationships Summary
Relationship	Type
User → Project	One‑to‑Many
Project → Task	One‑to‑Many
🧪 Migrations
Step 1: Initialize Prisma
npx prisma init
Step 2: Apply Migration
npx prisma migrate dev --name init_schema
✅ This command:

Creates tables in PostgreSQL

Applies constraints and relations

Generates Prisma Client

🌱 Database Seeding
Seed Script Example (prisma/seed.ts)
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      projects: {
        create: {
          name: "Rural Education Platform",
          tasks: {
            create: [
              { title: "Design schema", status: "completed" },
              { title: "Implement API", status: "pending" }
            ]
          }
        }
      }
    }
  });

  console.log(user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
Run Seed
npx prisma db seed
🔍 Verification
Prisma Studio
npx prisma studio
Used to visually confirm:

Tables created successfully

Relationships working correctly

Seed data inserted

(Add screenshots here if required)

📐 Normalization Explanation
First Normal Form (1NF)
No repeating groups

All fields contain atomic values

Second Normal Form (2NF)
No partial dependencies

Each non‑key attribute depends on the full primary key

Third Normal Form (3NF)
No transitive dependencies

Data stored only where it logically belongs

✅ This design avoids redundancy and ensures data consistency.

📈 Scalability Considerations
Easy to add new entities (Comment, Team, Role)

Indexed foreign keys improve query performance

Cascading deletes maintain referential integrity

Prisma allows smooth schema evolution

🔎 Common Query Patterns
Fetch all projects for a user

Fetch all tasks under a project

Filter tasks by status

Join queries using Prisma relations

⚠️ Challenges Faced
Understanding Prisma relations and cascading deletes

Structuring seed data for nested relations

Ensuring normalization while keeping queries efficient

Fixes Applied
Used Prisma relations instead of manual joins

Indexed foreign keys

Followed Prisma migration best practices

