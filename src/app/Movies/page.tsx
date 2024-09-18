"use client"
import styles from "./movies.module.css";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useEffect, useState } from "react";
import { getAllMovieAPI } from "./Services/api"
interface Movies {
    _id:string,
    title:string,
    posterImage:string
}
export const Movies = () => {
    const router = useRouter(); // Initialize the router

    // Movie data array

    const [movies,setMovies] = useState<Movies[]>([])
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL; // Fetch server URL from env
    const fetchMovies = async ()=>{
        try {
            
            const result = await getAllMovieAPI(); // Fetch movies
            console.log(result); 
            setMovies(result) 
        } catch (error) {
            console.error("Error fetching movies:", error); 
        }
    }
    useEffect(()=>{
        fetchMovies()
    },[])
    console.log(movies);
    


    // Navigate to movie details on card click
    const handleMovieClick = (_id: string) => {
        router.push(`/Movies/${_id}`); // Navigate to dynamic route
    };

    return (
        <div className={styles.container}>
            <h2>Recommended Movies</h2>
            <div className={styles.cards}>
            {movies.map((movie) => {
    console.log(movie); // Debug log to check each movie object
    return (
        <div 
            className={styles.card} 
            key={movie._id} 
            onClick={() => handleMovieClick(movie._id)}
        >
            <img 
                src={movie.posterImage ? `${serverURL}/uploads/${movie.posterImage}` : "default"} 
                alt={movie.title} 
            />
            <p>{movie.title}</p>
        </div>
    );
})}

            </div>
        </div>
    );
};

export default Movies;
