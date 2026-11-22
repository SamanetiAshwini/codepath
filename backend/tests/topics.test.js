import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('Topic & Learning Path APIs', () => {
  test('GET /api/topics/paths - Retrieves all learning paths (Python, Java, C++, DSA)', async () => {
    const res = await request(app).get('/api/topics/paths');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.paths)).toBe(true);
    expect(res.body.paths.length).toBeGreaterThanOrEqual(4);

    const slugs = res.body.paths.map(p => p.slug);
    expect(slugs).toContain('python');
    expect(slugs).toContain('java');
    expect(slugs).toContain('cpp');
    expect(slugs).toContain('dsa');
  });

  test('GET /api/topics - Retrieves topics list', async () => {
    const res = await request(app).get('/api/topics');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.topics.length).toBeGreaterThanOrEqual(15);
  });

  test('GET /api/topics/:id - Retrieves detailed topic with lessons and problems', async () => {
    const res = await request(app).get('/api/topics/dsa-arrays');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.topic.title).toBe('Arrays');
    expect(Array.isArray(res.body.lessons)).toBe(true);
    expect(Array.isArray(res.body.problems)).toBe(true);
  });

  test('GET /api/topics/:id/lessons - Retrieves lessons for a topic', async () => {
    const res = await request(app).get('/api/topics/dsa-arrays/lessons');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.lessons)).toBe(true);
  });
});
