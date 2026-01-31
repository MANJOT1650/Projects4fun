import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { compressVideo } from '../api';
import './Compress.css';

const CompressVideo = () => {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState('medium');
  const [targetSize, setTargetSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a video');
      return;
    }

    setLoading(true);
    setProgress(0);
    setResult(null);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    try {
      const response = await compressVideo(file, targetSize, quality);
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setResult(response.data);
        alert('✓ Video processed! ' + response.data.note);
      }, 300);
    } catch (error) {
      clearInterval(progressInterval);
      setProgress(0);
      alert('✗ ' + (error.response?.data?.error || 'Compression failed'));
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  return (
    <div className="compress-container">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </button>
      <h1>Compress Video</h1>
      <form onSubmit={handleSubmit} className="compress-form">
        <div className="form-group">
          <label htmlFor="video">Select Video (MP4, MKV):</label>
          <input
            type="file"
            id="video"
            accept="video/mp4,video/x-matroska"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quality">Quality:</label>
          <select
            id="quality"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            <option value="low">Low (Smaller size)</option>
            <option value="medium">Medium (Balanced)</option>
            <option value="high">High (Better quality)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="targetSize">Target Size (MB, optional):</label>
          <input
            type="number"
            id="targetSize"
            value={targetSize}
            onChange={(e) => setTargetSize(e.target.value)}
            placeholder="Enter target size in MB"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading && <span className="loading-spinner"></span>}
          {loading ? 'Processing...' : 'Compress Video'}
        </button>

        {loading && (
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}>
                <span className="progress-text">{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="progress-message">
              {progress < 30 && '🎬 Loading video...'}
              {progress >= 30 && progress < 60 && '⚙️ Processing frames...'}
              {progress >= 60 && progress < 90 && '🎨 Compressing video...'}
              {progress >= 90 && '✨ Finalizing...'}
            </div>
          </div>
        )}
      </form>

      {result && (
        <div className="result-container">
          <h2>✓ Processing Complete!</h2>
          <div className="result-info">
            <p><strong>Original Size:</strong> {result.originalSize}</p>
            <p><strong>Quality:</strong> {result.quality}</p>
            {result.targetSize !== 'Not specified' && (
              <p><strong>Target Size:</strong> {result.targetSize} MB</p>
            )}
            <p style={{ marginTop: '15px', color: '#ffeb3b' }}>
              <strong>Note:</strong> {result.note}
            </p>
            <p style={{ fontSize: '12px', marginTop: '10px' }}>
              {result.instructions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressVideo;
