import express from 'express';
import connectDB from './utils/db';
import movieRoutes from './routes/movieRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Parse JSON requests
app.use(express.json());

// Use movie routes
app.use('/api', movieRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
