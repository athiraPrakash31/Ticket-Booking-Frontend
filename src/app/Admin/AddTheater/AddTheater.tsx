"use client"
import { ChangeEvent, FormEvent } from 'react';
import { useState } from "react";
import styles from './addTheater.module.css';
import {addTheatersAPI} from './Services/api'
import toast, { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';


interface ErrorResponseData {
    message?: string;
    // Add other fields if needed
}

interface AddTheaterProps {
    onTheaterAdded: () => void; // Callback to trigger when theater is added
  }
  

export const AddTheater = ({ onTheaterAdded}:AddTheaterProps) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        capacity: 0,
        contactNumber: ''
        
    });
    
        // Handle form input changes
        const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

    const handleClick = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await addTheatersAPI(formData);
            if (response.success) {
                toast.success("Theater added successfully");
                onTheaterAdded();
            } else {
                // If response.success is false, display a general error message
                toast.error("Failed to add theater. Please try again.");
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponseData>;
            if (axiosError.response) {
                // Handle specific error responses from the server
                const errorMessage = axiosError.response.data?.message || "An unexpected error occurred";
                toast.error(errorMessage);
            } else {
                // Handle unknown errors or network issues
                toast.error("An unexpected error occurred");
            }
        }
    }
    
    return(
        
        <>
         <form className={styles.forms} onSubmit={handleClick} >
            <h2>Add Theaters</h2>
            <div className={styles.inputs}>

            <input type="text" placeholder="Name" name="name"  value={formData.name}
                        onChange={handleChange}/>
            <input type="text" placeholder="Location" name="location"  value={formData.location} onChange={handleChange} />
            <input type="number" placeholder="Capacity" name="capacity"  value={formData.capacity} onChange={handleChange}/>
            <input type="text" placeholder="Contact number" name="contactNumber"  value={formData.contactNumber} onChange={handleChange}/>

            <div className={styles.button}>

            <button >Add Theater</button>
            <Toaster/>
            </div>
            </div>
        </form>
        </>
    )
};

export default AddTheater;