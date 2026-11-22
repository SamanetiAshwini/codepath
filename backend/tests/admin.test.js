import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('Admin Authorization & Operations', () => {
  let studentToken = '';
  let adminToken = '';
  let createdProblemId = '';

  beforeAll(async () => {
    // 1. Register student
    const studentRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: `regular_student_${Date.now()}@codepath.edu`,
        password: 'password123',
        role: 'student'
      });
    studentToken = studentRes.body.token;

    // 2. Register admin
    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: `admin_user_${Date.now()}@codepath.edu`,
        password: 'password123',
        role: 'admin'
      });
    adminToken = adminRes.body.token;
  });

  test('POST /api/admin/problems - Rejects student with 403 Forbidden', async () => {
    const res = await request(app)
      .post('/api/admin/problems')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        title: 'Unauthorized Problem',
        topic_id: 'dsa-arrays',
        description: 'Should fail'
      });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/admin/problems - Allows admin to create problem', async () => {
    const res = await request(app)
      .post('/api/admin/problems')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Admin Created Challenge',
        topic_id: 'dsa-arrays',
        difficulty: 'Medium',
        description: 'Find the peak element in an array.',
        constraints: '1 <= nums.length <= 1000',
        topic_tags: ['Arrays', 'Binary Search']
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.problem.id).toBeDefined();
    createdProblemId = res.body.problem.id;
  });

  test('PUT /api/admin/problems/:id - Admin can update problem details', async () => {
    const res = await request(app)
      .put(`/api/admin/problems/${createdProblemId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        difficulty: 'Hard'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.problem.difficulty).toBe('Hard');
  });

  test('DELETE /api/admin/problems/:id - Admin can delete problem', async () => {
    const res = await request(app)
      .delete(`/api/admin/problems/${createdProblemId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
