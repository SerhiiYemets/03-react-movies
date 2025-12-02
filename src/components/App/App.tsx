import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import { fetchMovie } from "../../services/movieService"    

interface AppState {
  movies: Movie[];
  isLoading: boolean;
  error: boolean;
  selectedMovie: Movie | null;
} 

const App = () => {
  const [state, setState] = useState<AppState>({
    movies: [],
    isLoading: false,
    error: false,
    selectedMovie: null,
  });

  const handleSearch = async (query: string) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: false,
      movies: [],
    }));

    try {
      const movies = await fetchMovie(query);

      if (movies.length === 0) {
        toast.error("No movies found for your request.");
      }

      setState((prev) => ({
        ...prev,
        movies,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Something went wrong. Try again.");
      setState((prev) => ({
        ...prev,
        error: true,
        isLoading: false,
      }));
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
    </>
  );
};


export default App;