const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// 1. Set Security HTTP headers
app.use(helmet());

// 2. Rate Limiting
const limiter = rateLimit({
    max: 200,
    windowMs: 15 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// 3. Body parser - INREASED LIMIT
app.use(express.json({ limit: '1mb' }));

// 4. CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// 5. Prevent parameter pollution
app.use(hpp());

// Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/articles', require('./routes/article.routes'));
app.use('/api/v1/events', require('./routes/event.routes'));
app.use('/api/v1/team', require('./routes/team.routes'));
app.use('/api/v1/registrations', require('./routes/registration.routes'));
app.use('/api/v1/settings', require('./routes/settings.routes'));

app.use((req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

app.use(errorHandler);

module.exports = app;
