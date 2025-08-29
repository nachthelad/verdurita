import type { NextApiRequest, NextApiResponse } from "next";
import { rateLimit } from '../rateLimit';

// Mock response object
const createMockResponse = (): NextApiResponse => {
  const res = {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res as any;
};

// Mock request object
const createMockRequest = (ip: string = '127.0.0.1', headers: any = {}): NextApiRequest => {
  return {
    headers,
    socket: {
      remoteAddress: ip,
    },
  } as any;
};

describe('rateLimit', () => {
  let mockRes: NextApiResponse;

  beforeEach(() => {
    mockRes = createMockResponse();
    jest.clearAllMocks();
    // Reset rate limit store by requiring fresh module
    jest.resetModules();
  });

  it('should allow first request from IP', () => {
    const req = createMockRequest('192.168.1.1');
    const result = rateLimit(req, mockRes);

    expect(result).toBe(true);
    expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Limit', 60);
    expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', 59);
    expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Reset', expect.any(Number));
  });

  it('should use x-forwarded-for header when available', () => {
    const req = createMockRequest('127.0.0.1', {
      'x-forwarded-for': '203.0.113.1'
    });
    
    const result = rateLimit(req, mockRes);
    expect(result).toBe(true);
  });

  it('should handle array x-forwarded-for header', () => {
    const req = createMockRequest('127.0.0.1', {
      'x-forwarded-for': ['203.0.113.1', '198.51.100.1']
    });
    
    const result = rateLimit(req, mockRes);
    expect(result).toBe(true);
  });

  it('should handle comma-separated x-forwarded-for header', () => {
    const req = createMockRequest('127.0.0.1', {
      'x-forwarded-for': '203.0.113.1, 198.51.100.1'
    });
    
    const result = rateLimit(req, mockRes);
    expect(result).toBe(true);
  });

  it('should increment count for subsequent requests from same IP', () => {
    const req = createMockRequest('192.168.1.2');
    
    // First request
    rateLimit(req, mockRes);
    expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', 59);
    
    // Second request
    mockRes.setHeader = jest.fn(); // Reset mock
    rateLimit(req, mockRes);
    expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', 58);
  });

  it('should return false and send 429 when rate limit exceeded', () => {
    const req = createMockRequest('192.168.1.3');
    
    // Make 61 requests (exceeds limit of 60)
    for (let i = 0; i < 61; i++) {
      rateLimit(req, mockRes);
    }

    // Check that the last call returned false and sent 429
    expect(mockRes.status).toHaveBeenCalledWith(429);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Too Many Requests',
      message: expect.stringContaining('Rate limit exceeded. Try again in')
    });
  });

  it('should handle missing IP gracefully', () => {
    const req = {
      headers: {},
      socket: {},
    } as any;
    
    const result = rateLimit(req, mockRes);
    expect(result).toBe(true);
    expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', 59);
  });

  it('should reset count after time window expires', (done) => {
    const req = createMockRequest('192.168.1.4');
    
    // Make first request
    rateLimit(req, mockRes);
    expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', 59);
    
    // Mock time advancement
    const originalDateNow = Date.now;
    Date.now = jest.fn(() => originalDateNow() + 61000); // Advance by 61 seconds
    
    try {
      mockRes.setHeader = jest.fn(); // Reset mock
      rateLimit(req, mockRes);
      expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', 59);
      done();
    } finally {
      Date.now = originalDateNow; // Restore original Date.now
    }
  });
});