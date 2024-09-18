"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./addmovie.module.css";
import { addMoviesAPI } from './Services/api';

interface FormData {
  title: string;
  releaseDate: string;
  genre: string;
  director: string;
  cast: string; // Store cast as a comma-separated string in the form
  duration: string;
  rating: string;
  synopsis:string;
  language: string;
}

export const AddMovie = () => {
  // const [fileStatus, setFileStatus] = useState(false);
  const [posterImage, setPosterImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    releaseDate: "",
    genre: "",
    director: "",
    cast: "", // Comma-separated string
    duration: "",
    rating: "",
    synopsis:"",
    language: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPosterImage(e.target.files[0]);
      // setFileStatus(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { 
      title,
      releaseDate,
      genre,
      director,
      cast,
      duration,
      rating,
      synopsis,
      language,
    } = formData;
  
    if (!title || !releaseDate || !genre || !director || !cast || !duration || !rating || !synopsis || !language || !posterImage) {
      alert("Please fill in all details.");
      return;
    }
  
    // Convert the cast (comma-separated string) into an array of names
    const castArray = cast.split(',').map(name => name.trim());
  
    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("releaseDate", releaseDate);
    reqBody.append("genre", genre);
    reqBody.append("director", director);
  
    // Append each cast member separately
    castArray.forEach(castMember => {
      reqBody.append("cast", castMember);
    });
  
    reqBody.append("duration", duration);
    reqBody.append("rating", rating);
    reqBody.append("synopsis",synopsis);
    reqBody.append("language", language);
    if (posterImage) {
      reqBody.append("posterImage", posterImage);
    }
  
    try {
      const response = await addMoviesAPI(reqBody);
      console.log("Movie added successfully", response);
  
      setFormData({
        title: "",
        releaseDate: "",
        genre: "",
        director: "",
        cast: "",
        duration: "",
        rating: "",
        synopsis:"",
        language: "",
      });
      setPosterImage(null);
      // setFileStatus(false);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <>
      <form className={styles.forms} onSubmit={handleSubmit}>
        <h2>Add Movie</h2>
        <div className={styles.inputs}>
          <input type="text" placeholder="Title" name="title" value={formData.title} onChange={handleInputChange} />
          <input type="date" placeholder="Release Date" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} />
          <input type="text" placeholder="Genre" name="genre" value={formData.genre} onChange={handleInputChange} />
          <input type="text" placeholder="Director" name="director" value={formData.director} onChange={handleInputChange} />
          <input type="text" placeholder="Cast (comma separated)" name="cast" value={formData.cast} onChange={handleInputChange} />
          <input type="text" placeholder="Duration" name="duration" value={formData.duration} onChange={handleInputChange} />
          <input type="text" placeholder="Rating" name="rating" value={formData.rating} onChange={handleInputChange} />
          <input type="text" placeholder="Synopsis" name="synopsis" value={formData.synopsis} onChange={handleInputChange} />
          <input type="text" placeholder="Language" name="language" value={formData.language} onChange={handleInputChange} />
          <input type="file" placeholder="Poster Image" name="posterImage" accept="image/*" onChange={handleFileChange} />
          <div className={styles.button}>
            <button type="submit">Add Movie</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddMovie;
