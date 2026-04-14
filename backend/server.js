import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const startServer = async () => {
    try {
        await connectDB();

        const app = express();

       
        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true,
        }));
         app.use(express.json());

        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/movies', movieRoutes);
        app.use('/api/reviews', reviewRoutes);

        app.get('/', (req, res) => {
            res.send("API Running!");
        });

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log("Server Running at port " + PORT);
        });

    } catch (error) {
        console.error("Server failed to start:", error.message);
    }
    console.log("ENV CHECK:", process.env.MONGO_URL);
};

startServer();