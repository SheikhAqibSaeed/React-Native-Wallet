import express from 'express';
import dotenv from 'dotenv';
import { initDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoutes from './routes/transactionsRoutes.js';
import job from './config/cron.js';
dotenv.config();

const app = express();
if(process.env.NODE_ENV === "production") job.start();

// Middleware
app.use(rateLimiter)
app.use(express.json()); // Middleware to parse JSON request bodies

// app.use((req, res, next) => {
//     console.log("Request received:", req.method);
//     next(); // Call the next middleware or route handler
// }
// );
const PORT = process.env.PORT || 5000;



app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "ok"});
});
app.get('/', (req, res) => {
    res.send('Hello, World!111111111111');
});
// connectDB = process.env.DATABASE_URL;    
app.use('/api/transactions', transactionsRoutes)

// Initialize the database and start the server
initDB().then(() => {
    app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});
}).catch((error) => {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the process if server fails to start
});