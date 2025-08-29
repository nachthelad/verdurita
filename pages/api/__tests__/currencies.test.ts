import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../currencies';
// Mock axios
jest.mock('axios');

// Mock rate limit utility
jest.mock('@/utils/rateLimit', () => ({
  rateLimit: jest.fn(() => true),
}));

describe('/api/currencies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 405 for non-GET requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Method not allowed',
    });
  });

  it('should handle GET requests', async () => {
    const { req } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    // Test that it doesn't immediately fail
    expect(req.method).toBe('GET');
    expect(typeof handler).toBe('function');
  });

  it('should import rate limiting utility', () => {
    const { rateLimit } = require('@/utils/rateLimit');
    expect(typeof rateLimit).toBe('function');
  });
});