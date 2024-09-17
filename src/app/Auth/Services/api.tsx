import axios from 'axios';

// Define a type for the login form data
interface LoginFormData {
  email: string;
  password: string;
}

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL; // Ensure this is set in your .env file

// Login API call function with formData typed as LoginFormData
export const loginAPI = async (formData: LoginFormData) => {
  try {
    const response = await axios.post(`${serverURL}/login`, formData);
    return response.data;  // Return the API response
  } catch (error: unknown) {
    // Type guard to ensure error is an AxiosError
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
