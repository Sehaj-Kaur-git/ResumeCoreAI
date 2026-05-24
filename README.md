# ResumeCore AI

An AI-powered full-stack interview preparation platform that analyzes resumes and generates personalized interview insights using Gemini AI.

## Features

* AI-generated technical and behavioral interview questions
* Skill gap analysis and match scoring
* Personalized preparation roadmap
* Resume PDF upload support
* Authentication and protected routes
* Persistent interview history
* Fully responsive modern UI
* Real-time frontend-backend integration

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* GSAP
* Three.js
* React Three Fiber

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

### AI Integration

* Gemini API
* JSON Schema Validation

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Sehaj-Kaur-git/ResumeCoreAI.git
cd ResumeCoreAI
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:3001
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

## Project Structure

```bash
ResumeCoreAI/
│
├── frontend/
│   ├── app/
│   ├── features/
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── services/
│   └── server.js
```

---

## Future Improvements

* PDF export for reports
* Report sharing
* AI interview voice simulation
* Deployment and custom domain
* Advanced analytics dashboard

---

## Author

Sehaj Kaur Mahal

GitHub:
https://github.com/Sehaj-Kaur-git
