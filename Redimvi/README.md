# RedImVi - Media Compression Platform

## Project Overview
RedImVi is a full-stack web application for compressing and converting media files (videos and images).

### Features
- 🔐 User authentication (Login/Signup)
- 🖼️ Image compression with quality control
- 🎥 Video compression with target size or quality-based options
- 🔄 Video format conversion (MP4 ↔ MKV)
- 🎨 Modern, responsive UI with gradient design

## Tech Stack

### Frontend
- React 18
- Vite
- React Router v6
- Axios
- CSS3 (with gradients and animations)

### Backend
- Node.js
- Express.js
- PostgreSQL (Sequelize ORM)
- JWT (Authentication)
- bcryptjs (Password hashing)
- Multer (File uploads)
- Sharp (Image processing)
- FFmpeg (Video processing)

## Installation

### Prerequisites
- Node.js (v14+)
- PostgreSQL (local or cloud - Render, Supabase, etc.)
- FFmpeg (for video processing)

### Backend Setup
```bash
cd server
npm install
```

Create `.env` file:
```
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_secret_key
NODE_ENV=development
```

Start server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
```

Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

Start dev server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure
```
Redimvi/
├── server/
│   ├── routes/
│   │   ├── auth.js (Login/Signup)
│   │   └── compress.js (Media compression)
│   ├── models/
│   │   └── User.js
│   ├── middleware/
│   │   └── auth.js (JWT verification)
│   ├── index.js
│   ├── package.json
│   └── .env
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── CompressImage.jsx
    │   │   ├── CompressVideo.jsx
    │   │   ├── ConvertFormat.jsx
    │   │   └── Background.jsx
    │   ├── App.jsx
    │   ├── api.js
    │   └── config.js
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── .env
```

## Next Steps
1. Install dependencies in both folders
2. Set up MongoDB connection
3. Configure FFmpeg path if needed
4. Implement actual compression logic in backend
5. Add file download functionality
6. Add user profile/history features
7. Deploy to production

## Notes
- Use HTTPS in production
- Store sensitive data securely
- Implement rate limiting
- Add comprehensive error handling
- Test with various file sizes and formats
