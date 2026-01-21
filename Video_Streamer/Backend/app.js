import fs from 'fs';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import express from 'express';
import { nanoid } from 'nanoid';
import { exec } from 'child_process';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Multer Middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        '-' +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

// Multer Confifuration
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.json('👋 Hello, from server');
});

app.post('/upload', upload.single('file'), (req, res) => {
  // console.log('File uploaded successfully!');

  const lessonId = nanoid(10);
  const videoPath = req.file.path;
  const outputPath = `./uploads/courses/${lessonId}`;
  const hlsPath = `${outputPath}/index.m3u8`;

  console.log('hlsPath', hlsPath);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // FFmpeg Command
  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(`Exec error: ${error}`);
    }
    console.log(`Stdout: ${stdout}`);
    console.log(`Stderr: ${stderr}`);

    const videoUrl = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;

    res.json({
      message: 'Video converted to HLS format',
      videoUrl: videoUrl,
      lessonId: lessonId,
    });
  });
});

export default app;
