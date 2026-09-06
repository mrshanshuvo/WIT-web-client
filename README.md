# WhereIsIt — Frontend

WhereIsIt is a responsive lost and found platform that helps users report, discover, and recover lost items.

This repository contains the frontend application built with React and Vite. Users can browse and search reported items, submit lost or found items, manage their own listings, track recovered items, and manage their profiles.

## Live Demo

[WhereIsIt](https://wit-web-client.vercel.app)

## Features

* User registration and sign-in
* Firebase authentication
* Browse lost and found items
* Search and explore item listings
* View detailed item information
* Submit lost and found item reports
* Update and delete personal listings
* Manage personal items
* Manage recovered items
* User profile management
* Protected routes for authenticated users
* Blog section
* Contact page
* Responsive design
* Interactive UI and animations
* Notifications and user feedback

## Tech Stack

### Frontend

* React
* JavaScript
* Vite
* React Router
* Tailwind CSS
* TanStack Query
* Axios
* Firebase Authentication

### UI & Libraries

* Framer Motion
* Swiper
* React Slick
* Lottie
* SweetAlert2
* Sonner

## Project Structure

```text
src/
├── assets/
├── components/
├── pages/
│   ├── Auth/
│   ├── Blog/
│   ├── Contact/
│   ├── Home/
│   ├── Items/
│   ├── Shared/
│   ├── User/
│   └── recovered-items/
├── routes/
│   └── router.jsx
├── hooks/
├── layouts/
└── main.jsx
```

## Routes

### Public Routes

* `/`
* `/lost-found-items`
* `/inventory/:id`
* `/recovered-items`
* `/blog`
* `/contact`

### Protected Routes

* `/add-item`
* `/my-items`
* `/my-recovered-items`
* `/my-profile`
* `/update-item/:id`

### Authentication

* `/register`
* `/sign-in`

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/mrshanshuvo/whereisit-frontend.git
```

Navigate to the project:

```bash
cd whereisit-frontend
```

Install dependencies:

```bash
npm install
```

Create the required environment variables and start the development server:

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## Environment Variables

Create a `.env.local` file in the project root and configure the required Firebase and backend environment variables.

Example:

```env
VITE_API_URL=your_backend_api_url

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Do not commit environment files or private credentials to the repository.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Backend

The frontend communicates with the WhereIsIt backend REST API for application data and server-side operations.

Backend repository:

[WhereIsIt Backend](https://github.com/mrshanshuvo/whereisit-backend)

## Deployment

The frontend is deployed on Vercel.

Live application:

https://wit-web-client.vercel.app

## License

This project is for educational and portfolio purposes.
