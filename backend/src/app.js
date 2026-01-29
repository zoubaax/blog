const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// 1. Set Security HTTP headers
app.use(helmet());

// 2. Rate Limiting (Limit requests from same IP)
const limiter = rateLimit({
    max: 100, // Limit each IP to 100 requests per windowMs
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// 3. CORS Configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

// 4. Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // Limit body size

// 5. Data sanitization against XSS
// app.use(xss());

// 6. Prevent parameter pollution
app.use(hpp());

// Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/articles', require('./routes/article.routes'));
app.use('/api/v1/events', require('./routes/event.routes'));
app.use('/api/v1/team', require('./routes/team.routes'));
app.use('/api/v1/registrations', require('./routes/registration.routes'));

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
