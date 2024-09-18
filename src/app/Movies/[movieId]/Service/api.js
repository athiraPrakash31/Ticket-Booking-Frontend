import axios from 'axios'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

// fetch a movie by Id
export const getMovieByIdAPI = async(movieId) =>{
try{
    const response = await axios.get(`${serverURL}/admin/Movies/${movieId}`,{
        headers:{
            'Content-Type' :'application/json'
        }
    });
    if(response.data.success){
        console.log(response.data.success);
        
        return response.data.data
    }
    else {
        throw new Error(response.data.message || "Failed to fetch movie");
      }
}
catch(error){
    console.error(error,"something went error fetching movies");
    throw error;
}
}