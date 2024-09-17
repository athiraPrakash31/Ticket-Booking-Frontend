import { ChangeEvent, FormEvent, useState } from "react";
import styles from './addShow.module.css';

export const AddShow = () => {
    const [formData, setFormData] = useState({
        movie: '',
        theater: '',
        showDate: '',
        showTime: '',
        ticketPrice: '',
        availableSeats: '',
    });

    const showTimes = ['9.00am', '11.15am', '2.00pm', '4.15pm', '7.00pm', '9.00pm'];

    // Function to handle form data changes
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
                <h2>Add Shows</h2>
                <div className={styles.inputs}>
                    <input 
                        type="text" 
                        placeholder="movie" 
                        name="movie" 
                        value={formData.movie} 
                        onChange={handleInputChange} 
                    />

                    <input 
                        type="text" 
                        placeholder="theater" 
                        name="theater" 
                        value={formData.theater} 
                        onChange={handleInputChange} 
                    />

                    <input 
                        type="date" 
                        name="showDate" 
                        value={formData.showDate} 
                        onChange={handleInputChange} 
                    />

                    {/* Dropdown for selecting showTime */}
                    <select 
                        name="showTime" 
                        value={formData.showTime} 
                        onChange={handleInputChange}
                    >
                        <option value=""> Show Time</option>
                        {showTimes.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>

                    <input 
                        type="text" 
                        placeholder="ticketPrice" 
                        name="ticketPrice" 
                        value={formData.ticketPrice} 
                        onChange={handleInputChange} 
                    />

                    <input 
                        type="text" 
                        placeholder="availableSeats" 
                        name="availableSeats" 
                        value={formData.availableSeats} 
                        onChange={handleInputChange} 
                    />

                    <div className={styles.button}>
                        <button type="submit">Add Show</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddShow;
