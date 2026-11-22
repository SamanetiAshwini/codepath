import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('Student Progress Tracking APIs', () => {
  let authToken = '';

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: `progress_${Date.now()}@codepath.edu`,
        password: 'password123',
        username: 'progress_user'
      });
    authToken = res.body.token;
  });

  test('GET /api/progress - Retrieves student progress and metrics', async () => {
    const res = await request(app)
      .get('/api/progress')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.progress.totalSolved).toBeDefined();
    expect(res.body.progress.recommendedTopic).toBeDefined();
  });

  test('POST /api/progress/complete-topic - Marks topic as completed', async () => {
    const res = await request(app)
      .post('/api/progress/complete-topic')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ topicId: 'dsa-strings' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('GET /api/progress/leaderboard - Retrieves platform leaderboard', async () => {
    const res = await request(app).get('/api/progress/leaderboard');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.leaderboard)).toBe(true);
  });
});
