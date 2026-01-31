import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>RedImVi Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Welcome, {user.username}!</h2>
          <p>Your media compression platform</p>
        </section>

        <section className="features-section">
          <div className="feature-card">
            <h3>🖼️ Image Compression</h3>
            <p>Compress PNG, JPG, JPEG images with custom quality</p>
            <button onClick={() => navigate('/compress-image')}>Start</button>
          </div>

          <div className="feature-card">
            <h3>🎥 Video Compression</h3>
            <p>Compress MP4, MKV videos by percentage or target size</p>
            <button onClick={() => navigate('/compress-video')}>Start</button>
          </div>

          <div className="feature-card">
            <h3>🔄 Format Conversion</h3>
            <p>Convert between MP4 and MKV video formats</p>
            <button onClick={() => navigate('/convert')}>Start</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
