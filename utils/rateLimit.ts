import type { NextApiRequest, NextApiResponse } from "next";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60; // 60 requests per minute

export function rateLimit(req: NextApiRequest, res: NextApiResponse): boolean {
  const ip = getClientIP(req);
  const now = Date.now();
  
  // Clean up expired entries
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
  
  // Initialize or get current count for this IP
  if (!store[ip] || store[ip].resetTime < now) {
    store[ip] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    };
  } else {
    store[ip].count++;
  }
  
  // Set rate limit headers
  const resetTime = Math.ceil((store[ip].resetTime - now) / 1000);
  res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT_MAX_REQUESTS - store[ip].count));
  res.setHeader('X-RateLimit-Reset', resetTime);
  
  // Check if limit exceeded
  if (store[ip].count > RATE_LIMIT_MAX_REQUESTS) {
    res.status(429).json({
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Try again in ${resetTime} seconds.`
    });
    return false;
  }
  
  return true;
}

function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded 
    ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0])
    : req.socket.remoteAddress;
  
  return ip || 'unknown';
}