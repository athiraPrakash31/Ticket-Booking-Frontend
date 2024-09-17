import axios from "axios";


const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

// fetch all theaters
export const getAllTheatersAPI = async()=>{

    try{
        const response = await axios.get(`${serverURL}/admin/getAllTheaters`,{
            headers:{
                'Content-Type' :'application/json'
            }
        });
      
        if(response.data.success){
            return response.data.data
        }
        else {
            throw new Error(response.data.message || "Failed to fetch theaters");
          }
        
    }
    catch(error){
        console.error(error,"something went error fetching theaters");
        throw error;
    }
}


// soft delete the theater

export const deleteTheaterAPI = async(theaterId:string)=>{
    try {
      const response = await axios.delete(`${serverURL}/admin/deleteTheater/${theaterId}`,{
        headers: {
            'Content-Type':'application/json',
            'Authorization' :`Bearer ${sessionStorage.getItem('token')}`
        }
      }) ;
      if (response.data.success) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to delete theater");
    }
      
    } catch (error) {
        console.error("Error deleting theater:", error);
        throw error;

    }
}