import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/mongoose.js';
import appRouter from './routes/index.js';
import authMiddleware from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', authMiddleware);
app.use('/', express.static('views'));
app.use('/api', appRouter);


app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        code: 200,
        checks: {
            uptime: process.uptime()
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});