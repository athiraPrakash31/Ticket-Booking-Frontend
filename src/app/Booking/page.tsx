"use client";
import React, { useState } from 'react';
import styles from './booking.module.css'; // Adjust the path as needed

const seatPrice = 10; // Define the price per seat

export const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleSeatClick = (seatId: number) => {
    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = new Set(prevSelectedSeats);
      if (newSelectedSeats.has(seatId)) {
        newSelectedSeats.delete(seatId);
        setTotalPrice((prevPrice) => prevPrice - seatPrice);
      } else {
        newSelectedSeats.add(seatId);
        setTotalPrice((prevPrice) => prevPrice + seatPrice);
      }
      return newSelectedSeats;
    });
  };

  const renderSeats = () => {
    const seats = Array.from({ length: 100 }, (_, i) => i + 1); // Example: 100 seats
    return seats.map((seat) => (
      <button
        key={seat}
        onClick={() => handleSeatClick(seat)}
        className={`${styles.seatbutton} ${selectedSeats.has(seat) ? styles.selected : styles.deselected}`}
      >
        {seat}
      </button>
    ));
  };

  return (
    <div>
      <h1>Booking System</h1>
      <div>{renderSeats()}</div>
      <div className={styles.totalprice}>

      <button >Pay:&#8377;{totalPrice}</button>
      </div>
    </div>
  );
};

export default Booking;
