"use client";
import Footer from "@/Components/Footer/page";
import Header from "@/Components/Header/page";
import {useRouter } from "next/navigation";
// import Image from "next/image";
import styles from './movieId.module.css'
import {getMovieByIdAPI} from  './Service/api';
import { useEffect, useState } from "react";

// Movie data array

interface Movie {
  _id: string;
  title: string;
  posterImage: string;
  synopsis: string;
  language:string;
  genre: string;
  duration: string;
  releaseDate: string;
 
  // other fields
}
interface MovieDetailsProps {
  params: { movieId: string }; // Define the params prop with id
}

export const MovieDetails:React.FC<MovieDetailsProps> = ({params}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { movieId } = params;// Get the movie ID from URL params  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  console.log(movieId);
  console.log(params);
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL; // Fetch server URL from env

  
  const router = useRouter();
    const fetchMovieDetail = async ()=>{
      try{
        

          const movie = await getMovieByIdAPI(movieId)
          setSelectedMovie(movie); // Update state with the movie data
          console.log(movie);
        
        
      }
      catch(error){
        console.log(error);
        
      }
    }
    
  

  useEffect(()=>{
    

      fetchMovieDetail();
    
    
    },[movieId])

    
  if (!selectedMovie) {
    return <h1>Loading</h1>;
  }

  const booked =()=>{
    router.push('/Booking')
  }
  return (
    <>
      <Header />
      <div className={styles.images}>

      <img
        src={selectedMovie.posterImage? `${serverURL}/uploads/${selectedMovie.posterImage}` : "default"}
        alt={selectedMovie.title}
        width={230}
        height={400}
      />
      <div className={styles.details}>
        <h2>{selectedMovie.title}</h2>
        <div className={styles.theater}>
        <button>Theater name</button>
        <button>{selectedMovie.language}</button>
        </div>
        <p>{selectedMovie.duration}</p> <p>{selectedMovie.genre}</p>
        <p>
        {new Date(selectedMovie.releaseDate)
                   .toLocaleDateString("en-GB", {
                     year: "numeric",
                     month: "short",
                     day: "2-digit",
                   })
                   .replace(/ /g, "-")}

        </p>
        <button className={styles.booking} onClick={booked}>Book Tickets</button>

      </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
