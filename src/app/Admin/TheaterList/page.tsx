import { useEffect, useState } from "react";
import styles from "./theaterList.module.css";
import { deleteTheaterAPI, getAllTheatersAPI } from "./Services/api";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddTheater from "../AddTheater/AddTheater";
import toast from 'react-hot-toast';

// Define the type for Theater
interface Theater {
  _id:string,
  name: string;
  location: string;
  capacity: number;
  contactNumber: string;
}

export const TheaterList = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]); // TypeScript type hint for array of Theater

  const [show,setShow] =useState(false)
  
  const changeTab =()=> {
    setShow(!show)
  }
  const fetchTheaters = async () => {
    try {
      const theaterData = await getAllTheatersAPI();
      console.log(theaterData);
      // API returns a list of theaters
      setTheaters(theaterData); // Set theater data correctly
    } catch (error) {
      console.error(error);
    }
  };
  
console.log(theaters,"theater");

  useEffect(() => {
    fetchTheaters(); // Fetch theaters when component mounts
  }, []);

    // Function to handle updating the theater list after adding a new theater
  const handleTheaterAdded =()=>{
    // Refetch the theater list after a new theater is added
    fetchTheaters();
  }


  // function to handle deleting the theater
  const handleDelete = async (theaterId: string) => {
    try {
      const result = await deleteTheaterAPI(theaterId);
      console.log(result);
      toast.success("Theater deleted successfully!")
       // Refetch the theater list after deletion
      fetchTheaters();
    } catch (error) {
      console.error("Error deleting theater:", error);
    }
  };

  return (
    <>
{
  show?
    <div className={styles.button}>
      <button className={styles.addTheater} onClick={changeTab}><IoIosAdd className={styles.addIcon}/> Add Theaters</button>
    </div>: <div className={styles.button}>
      <button className={styles.addTheater} onClick={changeTab}>Show Theaters</button>
    </div>
}
     {show?<div className={styles.container}>
        {theaters.map((theater) => (
          <div className={styles.card} key={theater.name}>
            <div className={styles.cardDetails}>
              <h2>{theater.name}</h2>
              <p className={styles.location}><IoLocationOutline className={styles.iconLocation}/>{theater.location}</p>
              <p className={styles.seat}><MdOutlineAirlineSeatReclineNormal className={styles.iconSeat} />{theater.capacity} </p>
              <p>Phone: {theater.contactNumber}</p>
            </div>
            <div className={styles.delete}>
              <div><MdDelete onClick={() =>handleDelete(theater._id)}/></div>
            </div>
          </div>
          
        ))}
        
      </div>
      
      :<AddTheater onTheaterAdded={handleTheaterAdded}/>}
       
    </>
  );
};

export default TheaterList;
