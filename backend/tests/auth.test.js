import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('Authentication & Authorization Tests', () => {
  const testEmail = `student_${Date.now()}@codepath.edu`;
  let studentToken = '';

  test('POST /api/auth/register - Successfully register a new student', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: 'password123',
        username: 'test_student',
        fullName: 'Test Student',
        college: 'MIT Tech',
        gradYear: 2026
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(testEmail);
    expect(res.body.user.role).toBe('student');

    studentToken = res.body.token;
  });

  test('POST /api/auth/register - Rejects registration with duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: 'password123'
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/auth/login - Log in with registered student credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: 'password123'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  test('GET /api/profile - Access protected student profile', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.profile.email).toBe(testEmail);
    expect(res.body.progress).toBeDefined();
  });

  test('GET /api/profile - Rejects unauthenticated request', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.status).toBe(401);
  });
});
