"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { registerAPI } from "./Services/api"; // Import the registerAPI function
import styles from './register.module.css'
import Link from "next/link";
import { useRouter } from "next/navigation";
const RegistrationForm = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role:"user"
  });

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await registerAPI(formData); // Pass formData as userData
      console.log("Registration successful:", result);
      router.push('/Auth')
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (

    <div className={styles.card}>
        <h3>Register</h3>
        <div className={styles.form}>

    <form onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputs}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputs}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputs}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.submit}>
                <button type="submit" className={styles.button}>
                  Register
                </button>

              </div> 
              <p>Don&apos;t have an account?<Link href='/Auth'>Login</Link></p>
  
               </form>
        </div>
    </div>
  );
};

export default RegistrationForm;
