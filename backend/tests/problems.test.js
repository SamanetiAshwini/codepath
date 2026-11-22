import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('Problem Retrieval APIs', () => {
  test('GET /api/problems - Retrieves problem list with filters', async () => {
    const res = await request(app).get('/api/problems');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.problems.length).toBeGreaterThan(0);
  });

  test('GET /api/problems?difficulty=Beginner - Filters by difficulty', async () => {
    const res = await request(app).get('/api/problems?difficulty=Beginner');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    res.body.problems.forEach(p => {
      expect(p.difficulty.toLowerCase()).toBe('beginner');
    });
  });

  test('GET /api/problems/:id - Retrieves problem detail with starter code & sample test cases', async () => {
    const res = await request(app).get('/api/problems/prob-two-sum');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.problem.title).toBe('Target Pair Sum');
    expect(res.body.problem.starter_code).toBeDefined();
    expect(res.body.problem.sampleTestCases.length).toBeGreaterThan(0);
  });

  test('GET /api/problems/topic/:topicId - Retrieves problems for specific DSA topic', async () => {
    const res = await request(app).get('/api/problems/topic/dsa-arrays');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.problems.length).toBeGreaterThan(0);
  });
});
