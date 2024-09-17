"use client";
import { useState, ChangeEvent,FormEvent } from "react";
import styles from "./addmovie.module.css";
export const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    releaseDate: "",
    genre: "",
    director: "",
    cast: "",
    duration: "",
    rating: "",
    language: "",
    posterImage: "",
  });
  const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log(formData); // You can send formData to the backend here
};

  return (
    <>
      <form className={styles.forms} onSubmit={handleSubmit}>
        <h2>Add Movies</h2>
        <div className={styles.inputs}>
          <input type="text" placeholder="title" value={formData.title} onChange={handleInputChange}/>
          <input type="date" placeholder="releaseDate" />
          <input type="text" placeholder="genre" />
          <input type="text" placeholder="director" />
          <input type="text" placeholder="cast" />
          <input type="text" placeholder="duration" />
          <input type="text" placeholder="rating" />
          <input type="text" placeholder="language" />
          <input type="file" placeholder="posterImage" />
          <div className={styles.button}>
            <button type="submit">Add Movie</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddMovie;
