import rateLimit from '../config/upstash.js';

export const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit('my-limit-key');
    if (!success) {
      return res
        .status(429)
        .json({ message: 'Too many requests, please try again later' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
    next(error);
  }
};
