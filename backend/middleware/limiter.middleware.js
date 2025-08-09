import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 24,
  max: 3,
  message: `Sorry, you've reached your max number to links you can share: 3, please sign up to get 20 link shares an hour`,
  headers: true,
});

export default limiter;
