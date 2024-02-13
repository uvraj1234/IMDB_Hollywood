import { Request, Response } from 'express';
import MovieModel, { Movie } from '../models/Movie';

// Fetch all movies
export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fetch a single movie by ID
export const getMovieById = async (req: Request, res: Response) => {
  const movieId = req.params.id;

  try {
    const movie = await MovieModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new movie
export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, genre, releaseYear, ratings, comments } = req.body;

    const newMovie: Movie = {
      title,
      genre,
      releaseYear,
      ratings,
      comments,
    };

    const createdMovie = await MovieModel.create(newMovie);
    res.status(201).json(createdMovie);
  } catch (error) {
    console.error('Error creating movie:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation Error', details: error.errors });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a movie by ID
export const updateMovie = async (req: Request, res: Response) => {
    const movieId = req.params.id;
    const { title, genre, releaseYear, ratings, comments } = req.body;
  
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(
        movieId,
        { title, genre, releaseYear, ratings, comments },
        { new: true }
      );
  
      if (!updatedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      res.status(200).json(updatedMovie);
    } catch (error) {
      console.error('Error updating movie:', error);
  
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation Error', details: error.errors });
      }
  
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Delete a movie by ID
  export const deleteMovie = async (req: Request, res: Response) => {
    const movieId = req.params.id;
  
    try {
      const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
  
      if (!deletedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };