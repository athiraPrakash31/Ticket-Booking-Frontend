"use client";
import { IoIosAdd } from "react-icons/io";
import styles from "./movieList.module.css";
import { useEffect, useState } from "react";
import AddMovie from "../AddMovie/AddMovie";
import { getAllMovieAPI } from "@/app/Movies/Services/api";

interface Movie {
  _id: string;
  title: string;
  posterImage: string;
  synopsis: string;
  language: string;
  genre: string;
  duration: string;
  releaseDate: string;
}

export const MovieList = () => {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL; // Fetch server URL from env

  const [movies, setMovies] = useState<Movie[]>([]); // TypeScript type hint for array of Movie

  const [show, setShow] = useState(false);
  const changeTab = () => {
    setShow(!show);
  };

  //   fetch movies
  const fetchMovies = async () => {
    try {
      const movieData = await getAllMovieAPI();
      console.log(movieData);
      setMovies(movieData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(movies);

  useEffect(() => {
    fetchMovies(); // Fetch movies when component mounts
  }, []);
  return (
    <>
      {show ? (
        <div className={styles.button}>
          <button onClick={changeTab}>
            <IoIosAdd className={styles.addIcon} />
            Add Movies
          </button>
        </div>
      ) : (
        <div className={styles.button}>
          <button onClick={changeTab}>Show Movies</button>
        </div>
      )}

      {show ? (
        <div className={styles.container}>
          {movies.map((movie) => (
           <div className={styles.card} key={movie._id}>
           <div className={styles.cardInner}>
             {/* Front of the card (Poster Image) */}
             <div className={styles.cardFront}>
               <img
                 src={
                   movie.posterImage
                     ? `${serverURL}/uploads/${movie.posterImage}`
                     : "default"
                 }
                 alt={movie.title}
               />
             </div>
         
             {/* Back of the card (Movie Details) */}
             <div className={styles.cardBack}>
               <div className={styles.title}>{movie.title}</div>
               <div className={styles.genre}>{movie.genre}</div>
               <div className={styles.date}>
                 {new Date(movie.releaseDate)
                   .toLocaleDateString("en-GB", {
                     year: "numeric",
                     month: "short",
                     day: "2-digit",
                   })
                   .replace(/ /g, "-")}
               </div>
               <div className="duration">
                {movie.duration}
               </div>
             </div>
           </div>
         </div>
         
          ))}
        </div>
      ) : (
        <AddMovie />
      )}
    </>
  );
};
export default MovieList;
