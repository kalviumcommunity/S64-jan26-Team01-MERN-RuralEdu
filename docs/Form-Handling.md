# Signup Form with React Hook Form + Zod

## 📌 Overview

This project demonstrates how to build a **robust, scalable, and accessible signup form** using modern React form management and schema-based validation.

The focus of this implementation is not just on collecting user input, but on **engineering best practices**:
- Centralized validation logic
- Reusable UI components
- Accessibility-first design
- Clean separation of concerns

By completing this task, we explore how these patterns contribute to **maintainable and production-ready user interfaces**.

---

## 🎯 Objective

By completing this assignment, I achieved the following:

- Implemented **form state management** using **React Hook Form**
- Validated inputs using **Zod schemas** via `zodResolver`
- Built **reusable input components** with built-in error handling
- Improved **accessibility** using labels, ARIA attributes, and keyboard-friendly design
- Reflected on how **schema-based validation** and **component reuse** improve scalability in large applications

---

## 🛠 Tech Stack

- **React / Next.js (App Router)**
- **TypeScript**
- **React Hook Form**
- **Zod**
- **@hookform/resolvers**
- **Tailwind CSS** (for styling)

---

## 📦 Dependencies Setup

### Installation

Run the following command to install the required packages:

```bash
npm install react-hook-form zod @hookform/resolvers
Why These Libraries?
Library	Purpose
react-hook-form	Efficient and performant form state management
zod	Schema-based validation with strong TypeScript support
@hookform/resolvers	Connects Zod schemas to React Hook Form
🧩 Project Structure
src/
├── app/
│   └── signup/
│       └── page.tsx          # Signup page
├── components/
│   └── FormInput.tsx         # Reusable input component
├── schemas/
│   └── signupSchema.ts       # Zod validation schema
This structure ensures:

Validation logic is centralized

UI components are reusable

Pages remain clean and readable

🔐 Validation Schema (Zod)
File: schemas/signupSchema.ts
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
💡 Key Concepts
Single source of truth for validation rules

Automatically infers TypeScript types

Prevents invalid data from ever reaching the submit handler

Makes validation logic reusable across frontend & backend

📝 Signup Form Implementation
File: app/signup/page.tsx
Core Concepts Used:
useForm hook for form state

zodResolver for schema binding

Controlled error handling

Submit state handling

"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/schemas/signupSchema";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form Submitted:", data);
    alert(`Welcome, ${data.name}!`);
  };

  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Signup Form</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-80 bg-gray-50 p-6 border rounded-lg"
      >
        {/* Inputs here */}
      </form>
    </main>
  );
}
🔁 Reusable Input Component
File: components/FormInput.tsx
interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  register: any;
  error?: string;
}

export default function FormInput({
  label,
  name,
  type = "text",
  register,
  error,
}: FormInputProps) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>

      <input
        id={name}
        type={type}
        {...register(name)}
        aria-invalid={!!error}
        className="w-full border p-2 rounded"
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
Usage in Signup Form
<FormInput
  label="Name"
  name="name"
  register={register}
  error={errors.name?.message}
/>

<FormInput
  label="Email"
  name="email"
  type="email"
  register={register}
  error={errors.email?.message}
/>

<FormInput
  label="Password"
  name="password"
  type="password"
  register={register}
  error={errors.password?.message}
/>
✅ Benefits of Reusable Inputs
Reduces code duplication

Ensures consistent styling and behavior

Makes forms easier to maintain

Simplifies accessibility compliance

♿ Accessibility Considerations
This form is built with accessibility-first principles:

<label> properly linked using htmlFor

aria-invalid="true" applied to invalid fields

Error messages clearly visible and readable

Fully keyboard navigable

Visual feedback for validation errors

These practices ensure usability for:

Screen reader users

Keyboard-only users

Users with cognitive or visual impairments

🧪 Validation Scenarios
1️⃣ Empty Fields
Shows required field errors

Prevents form submission

2️⃣ Invalid Email
Displays email format error

Focus remains on the field

3️⃣ Valid Input
Form submits successfully

Console log and alert displayed

Example Console Output
Form Submitted: {
  name: "Alice",
  email: "alice@example.com",
  password: "secret123"
}
📸 Screenshots (To Include)
❌ Validation errors for empty fields

❌ Invalid email format error

✅ Successful form submission state

(Screenshots should be added here in the final submission)

🎥 Video Demo Checklist
Your demo video should show:

Entering invalid input → error appears instantly

Fixing errors → form submits successfully

Explanation of Zod schema

How zodResolver integrates with React Hook Form

Console log / alert output

Reusable input component explanation

Accessibility highlights (labels, ARIA)

🧠 Reflection
How Reusable Components Improve Scalability
Reusable components:

Enforce design consistency

Reduce bugs by centralizing logic

Make refactoring faster

Allow teams to scale UI without rewriting logic

In large applications, this pattern becomes non-negotiable.

✨ Creative Reflection
❓ What are the long-term advantages of using schema-based validation like Zod?
Schema-based validation offers major long-term benefits:

Single source of truth for validation rules

Easier refactoring as requirements evolve

Strong TypeScript inference reduces runtime bugs

Validation logic can be shared between frontend and backend

Cleaner components with less inline conditional logic

Compared to manual or inline validation, schema-based validation is:

More maintainable

More readable

More scalable

Less error-prone

This makes tools like Zod essential for large, real-world applications.

✅ Conclusion
This project demonstrates how thoughtful form architecture — combining React Hook Form, Zod, reusable components, and accessibility best practices — leads to clean, scalable, and production-ready UI design.