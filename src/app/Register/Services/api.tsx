import axios from 'axios';

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const registerAPI = async (userData: { username: string; email: string; phoneNumber: string; password: string;role: string; }) => {
  try {
    const response = await axios.post(`${serverURL}/register`, userData);
    console.log(response,"response");
    
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
