const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'video/mp4',
      'video/x-matroska',
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Image compression endpoint
router.post('/image', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }


    const { quality = 80 } = req.body;
    const inputPath = req.file.path;

    // Get exact original file extension from the uploaded filename
    const originalExtension = path.extname(req.file.originalname).toLowerCase().slice(1); // Remove the dot
    const originalFormat = req.file.mimetype.split('/')[1]; // 'png', 'jpeg', etc.

    // Use the exact original extension (preserves jpg vs jpeg)
    const outputFilename = `compressed_${Date.now()}.${originalExtension}`;
    const outputPath = path.join('uploads', outputFilename);

    // Create Sharp instance with auto-rotation to fix EXIF orientation
    const sharpInstance = sharp(inputPath, { failOnError: false })
      .rotate(); // Auto-rotate based on EXIF orientation

    // Compress image based on original format
    if (originalFormat === 'png') {
      await sharpInstance
        .png({
          quality: parseInt(quality),
          compressionLevel: Math.floor((100 - parseInt(quality)) / 10), // 0-9
          palette: true // Use palette for smaller file size
        })
        .toFile(outputPath);
    } else {
      // JPEG/JPG
      await sharpInstance
        .jpeg({
          quality: parseInt(quality),
          mozjpeg: true // Use mozjpeg for better compression
        })
        .toFile(outputPath);
    }

    // Get file sizes for comparison
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const compressionRatio = (
      ((inputStats.size - outputStats.size) / inputStats.size) * 100
    ).toFixed(2);

    // Delete original uploaded file
    fs.unlinkSync(inputPath);

    res.json({
      message: 'Image compressed successfully',
      filename: outputFilename,
      format: originalExtension.toUpperCase(),
      originalSize: `${(inputStats.size / 1024).toFixed(2)} KB`,
      compressedSize: `${(outputStats.size / 1024).toFixed(2)} KB`,
      compressionRatio: `${compressionRatio}%`,
      downloadUrl: `/api/compress/download/${outputFilename}`,
      quality: parseInt(quality),
    });
  } catch (error) {
    console.error('Image compression error:', error);
    res.status(500).json({ error: error.message || 'Image compression failed' });
  }
});

// Video compression endpoint (placeholder - requires FFmpeg)
router.post('/video', authenticateToken, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { targetSize, quality = 'medium' } = req.body;
    const inputPath = req.file.path;
    const inputStats = fs.statSync(inputPath);

    // For now, return info about what would be done
    // FFmpeg needs to be installed separately
    res.json({
      message: 'Video compression is ready for processing',
      filename: req.file.filename,
      originalSize: `${(inputStats.size / 1024 / 1024).toFixed(2)} MB`,
      quality: quality,
      targetSize: targetSize || 'Not specified',
      note: 'Install FFmpeg for actual compression: https://ffmpeg.org/download.html',
      instructions: 'After installing FFmpeg, compression will be automatic',
      downloadUrl: null, // Will be available after FFmpeg integration
    });

    // Store for later processing
    fs.renameSync(inputPath, path.join('uploads', `video_${Date.now()}_${req.file.originalname}`));
  } catch (error) {
    console.error('Video compression error:', error);
    res.status(500).json({ error: error.message || 'Video compression failed' });
  }
});

// Format conversion endpoint (placeholder - requires FFmpeg)
router.post('/convert', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { fromFormat, toFormat } = req.body;
    const inputPath = req.file.path;
    const inputStats = fs.statSync(inputPath);

    if (fromFormat === toFormat) {
      fs.unlinkSync(inputPath);
      return res.status(400).json({ error: 'Source and target formats must be different' });
    }

    res.json({
      message: 'Video format conversion is ready for processing',
      filename: req.file.filename,
      originalSize: `${(inputStats.size / 1024 / 1024).toFixed(2)} MB`,
      fromFormat: fromFormat,
      toFormat: toFormat,
      note: 'Install FFmpeg for actual conversion: https://ffmpeg.org/download.html',
      instructions: `After installing FFmpeg, will convert ${fromFormat.toUpperCase()} → ${toFormat.toUpperCase()}`,
      downloadUrl: null, // Will be available after FFmpeg integration
    });

    // Store for later processing
    fs.renameSync(inputPath, path.join('uploads', `convert_${Date.now()}_${req.file.originalname}`));
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: error.message || 'Conversion failed' });
  }
});

// Download compressed file endpoint
router.get('/download/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    // Security check: prevent directory traversal
    const normalizedPath = path.normalize(filePath);
    const uploadsDir = path.resolve(path.join(__dirname, '..', 'uploads'));

    if (!normalizedPath.startsWith(uploadsDir)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Send file
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      // Optionally delete file after download
      // fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: error.message || 'Download failed' });
  }
});

// List uploaded files (for debugging)
router.get('/list', authenticateToken, (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const files = fs.readdirSync(uploadsDir);

    const filesList = files.map(file => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      return {
        filename: file,
        size: `${(stats.size / 1024).toFixed(2)} KB`,
        created: stats.birthtime,
      };
    });

    res.json({ files: filesList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
