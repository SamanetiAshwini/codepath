import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('Submission & Code Execution APIs', () => {
  let authToken = '';

  beforeAll(async () => {
    const regRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: `coder_${Date.now()}@codepath.edu`,
        password: 'password123',
        username: 'runner_test'
      });
    authToken = regRes.body.token;
  });

  test('POST /api/submissions/run - Executes sample test cases without saving', async () => {
    const res = await request(app)
      .post('/api/submissions/run')
      .send({
        problemId: 'prob-two-sum',
        language: 'python',
        code: `class Solution:\n    def twoSum(self, nums, target):\n        m = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in m: return [m[diff], i]\n            m[n] = i\n        return []`
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe('Accepted');
    expect(res.body.testCaseResults.length).toBeGreaterThan(0);
  });

  test('POST /api/submissions - Submit solution and persist in database', async () => {
    const res = await request(app)
      .post('/api/submissions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        problemId: 'prob-two-sum',
        language: 'python',
        code: `class Solution:\n    def twoSum(self, nums, target):\n        seen = {}\n        for i, val in enumerate(nums):\n            if target - val in seen: return [seen[target - val], i]\n            seen[val] = i\n        return []`
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.submission).toBeDefined();
    expect(res.body.status).toBe('Accepted');
  });

  test('GET /api/submissions/history - Retrieves user submission history', async () => {
    const res = await request(app)
      .get('/api/submissions/history')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.submissions.length).toBeGreaterThan(0);
  });
});
