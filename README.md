ClubSphere – Membership & Event Management for Local Clubs
Project Overview

ClubSphere is a full‑stack MERN web application designed to help users discover, join, and manage local clubs with ease. The platform supports club memberships, event management, and secure online payments, all within a modern and responsive interface.

The system features role‑based dashboards for Admins, Club Managers, and Members, integrates Stripe for payments, and uses modern React tools such as React Hook Form and TanStack Query for efficient data handling.

Core Features
Member Features

Browse clubs and events

Join clubs (free or paid memberships)

View and manage active memberships

Register for club events

View upcoming events from joined clubs

Club Manager Features

Create and manage club profiles

Set and update membership fees

Create, edit, and manage events

View club members and event registrations

Admin Features

Approve or reject club submissions

Promote or demote users to Club Manager

Monitor all payments and platform activity

Access role‑based dashboards with summary cards and charts

Additional Features

Firebase Authentication (Email/Password + Google Sign‑In)

JWT‑based protected routes

Search, filter, and sort clubs and events

Fully responsive design (mobile, tablet, desktop)

Smooth animations using Framer Motion

Efficient data fetching with TanStack Query

Stripe test payment integration

Technology Stack
Frontend

React.js

React Router

Tailwind CSS & DaisyUI

React Hook Form

TanStack Query

Framer Motion

React Icons

Backend

Node.js

Express.js

MongoDB

Firebase Admin (JWT Verification)

Stripe API

Database Design (Collections)
users

name, email, photoURL

role (admin | clubManager | member)

createdAt

clubs

clubName, description, category, location

bannerImage, membershipFee

status (pending | approved | rejected)

managerEmail (FK → users)

createdAt, updatedAt

memberships

userEmail, clubId

status (active | expired | pendingPayment)

paymentId

joinedAt, expiresAt (optional)

events

clubId, title, description

eventDate, location

isPaid, eventFee

maxAttendees (optional)

createdAt

eventRegistrations

eventId, userEmail, clubId

status (registered | cancelled)

paymentId (optional)

registeredAt

payments

userEmail, amount

type (membership | event)

clubId, eventId (if applicable)

stripePaymentIntentId / transactionId

status, createdAt

Pages & Routing
Public Pages

/ – Home

/clubs – Clubs Listing

/clubs/:id – Club Details

/events – Events Listing

/events/:id – Event Details

/login – Login Page

/register – Register Page

Optional: /pricing, /how-it-works, 404

Dashboard Pages (Role‑Based)

Admin: Overview, Users, Clubs, Payments

Club Manager: Overview, My Clubs, Members, Events

Member: Overview, My Clubs, My Events, Payment History

Installation & Setup
Environment
PORT=3000
Install Dependencies
Server
cd server
npm install
Client
cd client
npm install
Run Locally
Server
npm run dev
Client
npm start
Deployment



Testing Accounts
Admin

Email: admin100@gmail.com

Password: Admin@1234

Club Manager

Email: manager100@gmail.com

Password: Manager@11234

Important NPM Packages

express, cors, mongodb

firebase-admin

stripe

react, react-dom, react-router-dom

tailwindcss, daisyui

react-hook-form

@tanstack/react-query

framer-motion

react-icons

Key Highlights

Role‑based dashboards

Secure Firebase JWT authentication

Stripe payment integration

Dynamic club & event search, filter, and sorting

Modern, responsive UI

Smooth animations and enhanced UX

Live Project & Source Code

Live Site: [Insert Live URL]

Client Repository: [Insert Client Repo URL]

Server Repository: [Insert Server Repo URL]