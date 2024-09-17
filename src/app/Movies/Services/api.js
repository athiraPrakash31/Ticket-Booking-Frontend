import axios from "axios";


const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

// fetch all theaters
export const getAllMovieAPI = async()=>{

    try{
        const response = await axios.get(`${serverURL}/admin/getAllMovies`,{
            headers:{
                'Content-Type' :'application/json'
            }
        });
      
        if(response.data.success){
            console.log(response.data.success);
            
            return response.data.data
        }
        else {
            throw new Error(response.data.message || "Failed to fetch movies");
          }
        
    }
    catch(error){
        console.error(error,"something went error fetching movies");
        throw error;
    }
}
