Overview

In this assignment, Zod was integrated into the Next.js backend to validate incoming POST and PUT API requests.
Zod is a TypeScript-first schema validation library that ensures all incoming data is well-structured, type-safe, and predictable before it reaches business logic or the database.

This approach prevents malformed inputs, improves API reliability, and ensures consistent error responses across the application.

Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

Validation Library: Zod

API Layer: Next.js Route Handlers

1. Why Input Validation Matters

APIs should never blindly trust incoming data.

Without validation:

Required fields may be missing

Incorrect data types may reach the database

Invalid values may cause runtime crashes

Debugging becomes difficult and error-prone

Example of Invalid Input
{
  "name": "",
  "email": "not-an-email"
}


If this data is stored without checks, it can lead to:

Broken user records

Unexpected UI behavior

Hard-to-trace production bugs

Zod prevents this by validating input before it is processed.

2. Installing and Setting Up Zod

Zod was added as a project dependency:

npm install zod


It is then imported wherever validation is required:

import { z } from "zod";

3. Creating Zod Schemas

Schemas define what valid input looks like for each API endpoint.

User Schema Example
// lib/schemas/userSchema.ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "User must be 18 or older"),
});

Benefits of Using Schemas

Strong runtime validation

Clear, descriptive error messages

Automatic TypeScript type inference

Centralized validation logic

4. Applying Validation in API Handlers

Zod schemas are applied inside POST and PUT handlers to validate request bodies.

Basic Validation Example
import { NextResponse } from "next/server";
import { userSchema } from "@/lib/schemas/userSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = userSchema.parse(body);

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: validatedData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid request data" },
      { status: 400 }
    );
  }
}


If validation fails, the request never reaches database logic.

5. Graceful Validation Error Handling

To ensure consistent and readable error responses, ZodError is handled explicitly.

Improved Error Handling with ZodError
import { ZodError } from "zod";
import { NextResponse } from "next/server";
import { userSchema } from "@/lib/schemas/userSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = userSchema.parse(body);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
          errors: error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Unexpected server error" },
      { status: 500 }
    );
  }
}

Result

APIs fail gracefully

Clients receive clear, structured feedback

No unhandled exceptions or crashes

6. Schema Reuse Between Client and Server

One major advantage of Zod is schema reuse in full-stack TypeScript applications.

Shared Schema Example
// lib/schemas/userSchema.ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export type UserInput = z.infer<typeof userSchema>;

Benefits of Reuse

Same validation rules on frontend and backend

No duplication of logic

Prevents frontend/backend validation mismatch

Improved maintainability in team projects

7. Testing Validation

Validation was tested using curl and API clients like Postman.

✅ Valid Request
curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{"name":"Alice","email":"alice@example.com","age":22}'

❌ Invalid Request
curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{"name":"A","email":"bademail"}'

Expected Error Response
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "field": "name",
      "message": "Name must be at least 2 characters long"
    },
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}

