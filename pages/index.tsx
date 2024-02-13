// pages/index.tsx
import { useEffect, useState } from 'react';
import MovieModel, { Movie as MovieType } from '../models/Movie';
import connectDB from '../utils/db'; // Update the import path

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // Connect to the database
      await connectDB();

      // Fetch all movies
      const allMovies = await MovieModel.find();
      setMovies(allMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>My IMDb Clone</h1>
      <h2>Movies:</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <strong>{movie.title}</strong> ({movie.releaseYear}) - {movie.genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
