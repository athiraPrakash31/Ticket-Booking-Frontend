"use client"

import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";
import banner1 from '../../Themes/Images/avengers.jpg';
import banner2 from '../../Themes/Images/2018film.jpg';
import banner3 from '../../Themes/Images/kaala.jpg';
import styles from './dashboard.module.css';

export const Dashboard = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [banner1, banner2, banner3];

    // Automatically change image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [images.length]);

    // Function to handle manual image change
    const handleImageChange = (index: SetStateAction<number>) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className={styles.slideshow}>
            {/* Display the current image */}
            <div className={styles.imageContainer}>
                <Image 
                    src={images[currentImageIndex]} 
                    alt={`banner-image-${currentImageIndex}`} 
                    width={1360} 
                    height={400} 
                    className={styles.bannerImage} 
                />
            </div>

            {/* Buttons for manual image navigation */}
            <div className={styles.buttonContainer}>
                {images.map((_, index) => (
                    <button 
                        key={index} 
                        className={`${styles.navButton} ${index === currentImageIndex ? styles.active : ''}`}
                        onClick={() => handleImageChange(index)}
                    >
                      
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
