// models/Movie.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface Movie {
  _id?: string;
  title: string;
  genre: string;
  releaseYear: number;
  ratings: number[]; // Add a ratings array field
  comments: string[]; // Add a comments array field
}

const movieSchema = new Schema<Movie>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  _id: { type: String, required: false },
  ratings: { type: [Number], default: [] }, // Default to an empty array
  comments: { type: [String], default: [] }, // Default to an empty array
});

const MovieModel = mongoose.model<Movie & Document>('Movie', movieSchema);

export default MovieModel;
