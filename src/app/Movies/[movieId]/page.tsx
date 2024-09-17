"use client";
import Footer from "@/Components/Footer/page";
import Header from "@/Components/Header/page";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from './movieId.module.css'
import goat from "../../../Themes/Images/goat.jpg";
import vaazha from "../../../Themes/Images/vaazha.jpg";
import nunakuzhi from "../../../Themes/Images/nunakuzhi.jpg";
import saturday from "../../../Themes/Images/saturday.jpg";
import stree from "../../../Themes/Images/stree2.jpg";

// Movie data array
const movies = [
  { id: 1, src: goat, alt: "Goat", name: "Goat" },
  { id: 2, src: vaazha, alt: "Vaazha", name: "Vaazha" },
  { id: 3, src: nunakuzhi, alt: "Nunakuzhi", name: "Nunakuzhi" },
  { id: 4, src: saturday, alt: "Saturday", name: "Saturday" },
  { id: 5, src: stree, alt: "Stree", name: "Stree" },
];

export const MovieDetails = () => {
  const { movieId } = useParams();
  const router = useRouter();


  if (typeof movieId !== "string") {
    return <h1>Invalid movie ID</h1>;
  }
  const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));

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

      <Image
        src={selectedMovie.src}
        alt={selectedMovie.alt}
        width={230}
        height={400}
      />
      <div className={styles.details}>
        <h2>{selectedMovie.name}</h2>
        <div className={styles.theater}>
        <button>IMAX</button>
        <button>Tamil, Telugu</button>
        </div>
        <p>3h 3m</p> <p>Action, Drama, Thriller</p><p>13 Sep, 2024</p>
        <button className={styles.booking} onClick={booked}>Book Tickets</button>

      </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
