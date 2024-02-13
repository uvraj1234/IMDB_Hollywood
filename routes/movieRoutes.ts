import express from 'express';
import * as movieController from '../controllers/movieController';

const router = express.Router();

// Fetch all movies
router.get('/movies', movieController.getMovies);

// Fetch a single movie by ID
router.get('/movies/:id', movieController.getMovieById);

// Create a new movie
router.post('/movies', movieController.createMovie);

// Update a movie by ID
router.put('/movies/:id', movieController.updateMovie);

// Delete a movie by ID
router.delete('/movies/:id', movieController.deleteMovie);

export default router;
