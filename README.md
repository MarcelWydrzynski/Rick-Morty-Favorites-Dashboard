Rick & Morty – Favorites Dashboard

A small full-stack application built with React, Supabase, and Supabase Edge Functions.
Users can sign up, log in, browse Rick & Morty characters, and save their favorites.


✨ Features

Email/password authentication (Supabase Auth)

Protected routes (dashboard & favorites)

Paginated characters list

Add / remove favorite characters

Favorites page with pagination

Secure database access using Row Level Security (RLS)

Supabase Edge Function for GraphQL API


🛠 Tech Stack

Frontend: React, TypeScript, React Router, Tailwind CSS

Backend: Supabase (Auth + PostgreSQL) + supabase edge functions 

API: Rick & Morty GraphQL API


🧩 Architecture Overview

Authentication is handled by Supabase Auth and exposed through a React Context.

All GraphQL requests are made through a Supabase Edge Function (not directly from the frontend).

Favorites are stored in Postgres and protected using Row Level Security.


Live Demo: https://rick-morty-favorites-dashboard.vercel.app/login


🔧 Setup Instructions
Environment variables

1. Create a .env file:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Run locally
npm install
npm run dev
