// import { Redis } from '@upstash/redis'
// import { RateLimit } from '@upstash/ratelimit'

// import "dotenv/config"

// const ratelimit = new RateLimit({

// redis:Redis.fromEnv(),
// limiter: RateLimit.slidingWindow(4, '60 s'), // 100 requests every 60 seconds
// })
// export default ratelimit;

// config/upstash.js
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import 'dotenv/config';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(4, '30 s'), // 10 requests per 10 seconds
  analytics: true,
});

export default rateLimit;
