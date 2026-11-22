import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      platform: 'CODEPATH – FROM ZERO TO PLACEMENT READY',
      timestamp: new Date().toISOString()
    });
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/topics', topicRoutes);
  app.use('/api/problems', problemRoutes);
  app.use('/api/submissions', submissionRoutes);
  app.use('/api/progress', progressRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/ai', aiRoutes);

  // 404 & Error handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
