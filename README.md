🌟 ClubSphere – Membership & Event Management for Local Clubs
📌 Project Overview

ClubSphere is a modern full-stack MERN web application that makes it easy to discover, join, and manage local clubs 🎯.
Users can explore clubs, purchase memberships, register for events, and make secure online payments — all through a clean, responsive, and intuitive interface.

The platform includes role-based dashboards for Admins, Club Managers, and Members, integrates Stripe for payments 💳, and uses powerful modern React tools like React Hook Form and TanStack Query for efficient data handling.

🚀 Core Features
👤 Member Features

🔍 Browse clubs and upcoming events

🤝 Join clubs with free or paid memberships

📂 View and manage active memberships

🎟 Register for club events

📅 See upcoming events from joined clubs

🧑‍💼 Club Manager Features

🏷 Create and manage club profiles

💰 Set and update membership fees

🗓 Create, edit, and manage events

👥 View club members and event registrations

✨ Additional Features

🔐 Firebase Authentication (Email/Password + Google Sign-In)

🪪 JWT-based protected routes

🔎 Search, filter, and sort clubs & events

📱 Fully responsive design (mobile, tablet, desktop)

🎞 Smooth animations using Framer Motion

⚡ Efficient data fetching with TanStack Query

💳 Stripe test payment integration

🛠 Technology Stack
🎨 Frontend

React.js

React Router

Tailwind CSS & DaisyUI

React Hook Form

TanStack Query

Framer Motion

React Icons

⚙ Backend

Node.js

Express.js

MongoDB

Firebase Admin (JWT Verification)

Stripe API

🗄 Database Design (Collections)
👥 users

name, email, photoURL

role (admin | clubManager | member)

createdAt

🏛 clubs

clubName, description, category, location

bannerImage, membershipFee

status (pending | approved | rejected)

managerEmail (FK → users)

createdAt, updatedAt

🤝 memberships

userEmail, clubId

status (active | expired | pendingPayment)

paymentId

joinedAt, expiresAt (optional)

🎉 events

clubId, title, description

eventDate, location

isPaid, eventFee

maxAttendees (optional)

createdAt

📝 eventRegistrations

eventId, userEmail, clubId

status (registered | cancelled)

paymentId (optional)

registeredAt

💰 payments

userEmail, amount

type (membership | event)

clubId, eventId (if applicable)

stripePaymentIntentId / transactionId

status, createdAt

🧭 Pages & Routing
🌐 Public Pages

/ – Home

/clubs – Clubs Listing

/clubs/:id – Club Details

/events – Events Listing

/events/:id – Event Details

/login – Login

/register – Register

Optional: /pricing, /how-it-works, 404

📊 Dashboard Pages (Role-Based)

Admin: Overview, Users, Clubs, Payments

Club Manager: Overview, My Clubs, Members, Events

Member: Overview, My Clubs, My Events, Payment History

📚 Important NPM Packages

express, cors, mongodb

firebase-admin

stripe

react, react-dom, react-router-dom

tailwindcss, daisyui

react-hook-form

@tanstack/react-query

framer-motion

react-icons

🌟 Key Highlights

🔑 Role-based dashboards

🔐 Secure Firebase JWT authentication

💳 Stripe payment integration

🔍 Dynamic search, filter & sorting

🎨 Modern and responsive UI

✨ Smooth animations and enhanced UX

 ##  How to Run the Project Locally (Step-by-Step):
 1️⃣ Clone the Repositories
 git clone https://github.com/akib2012/ClubSphere_clinet_side.git
 git clone https://github.com/akib2012/ClubSphere_server_side.git
 2️⃣ Install Dependencies
npm install
3️⃣ Environment Variables

Create a .env file in both client and server directories and add:

Client: 
VITE_API_URL=your_server_url
VITE_FIREBASE_API_KEY=your_key
VITE_STRIPE_PUBLISHABLE_KEY=your_key
server: 
PORT=5000
MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret
FB_SERVICE_KEY=your_firebase_service_key


4️⃣ Run the Project
npm run dev
 


🧪 Testing Accounts
👑 Admin

Email: admin100@gmail.com

Password: Admin@1234

🧑‍💼 Club Manager

Email: manager100@gmail.com

Password: Manager@11234

🔗 Live Project & Source Code

🌐 Live Site: https://musical-flan-487309.netlify.app/

🖥 Server Repo: https://github.com/akib2012/ClubSphere_server_side.git

💻 Client Repo: https://github.com/akib2012/ClubSphere_clinet_side.git

👨‍💻 Developed by

MD Perbej Bhuiyan Akib 🚀
