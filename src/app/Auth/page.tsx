"use client";
import styles from "./login.module.css";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginAPI } from "./Services/api";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
  const router = useRouter();

  // Form data and errors state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Google login
  const handlegoogleSignIn = () => {
    signIn("google"); // Triggers Google sign-in
  };

  // Custom validation for form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

   // Validate password
   const maxLength = 12; // Set password maximum length
   if (!formData.password.trim()) {
     newErrors.password = "Password is required";
     isValid = false;
   } else if (formData.password.length < 6) {
     newErrors.password = "Password must be at least 6 characters";
     isValid = false;
   } else if (formData.password.length > maxLength) {
     newErrors.password = `Password cannot exceed ${maxLength} characters`;
     isValid = false;
   }

    setErrors(newErrors);
    return isValid;
  };

  const signin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run validation before submitting
    if (!validateForm()) {
      toast.error("Please correct the errors before submitting");
      return;
    }

    try {
      const response = await loginAPI(formData);
      const { token, user } = response;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", user.role);

      toast.success("Login successful!");

      if (user.role === "admin") {
        router.push("/Admin");
      } else {
        router.push("/Booking");
      }
    } catch (error:any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message); // Display backend error message
      } else {
        toast.error("Login failed. Please try again.");
      }    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear the errors as the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

// handle when a user touches a field

const handleblur = (e: React.FocusEvent<HTMLInputElement>)=>{
  const {name} = e.target;
  setTouched((prevTouched) => ({
    ...prevTouched,
    [name]: true,
  }));
  validateForm();
}

  return (
    <>
      <div className={styles.card}>
        <h3>Login</h3>
        <div className={styles.form}>
          <form onSubmit={signin}>
            <>
              {/* Email field with custom validation */}
              <div className={styles.inputs}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleblur} // Trigger when user leaves the field
                />
 {touched.email && errors.email && (
                  <p className={styles.error}>{errors.email}</p>
                )}          
                    </div>

              {/* Password field with custom validation */}
              <div className={styles.inputs}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleblur}
                />
                  {/* Show error only if the user has touched the field */}
                  {touched.password && errors.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
              </div>

              <div className={styles.submit}>
                <button type="submit" className={styles.button}>
                  Login
                </button>
                <Toaster />
              </div>

              <div className={styles.googleLogin}>
                <button onClick={handlegoogleSignIn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="40"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  SignIn with Google
                </button>
              </div>
            </>
            <p>
              Don&apos;t have an account? <Link href="/Register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
