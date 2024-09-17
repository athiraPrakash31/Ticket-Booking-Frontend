import axios from 'axios'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addTheatersAPI = async(theaterData)=>{
    try{
        const response = await axios.post(`${serverUrl}/admin/addTheaters`,theaterData,{
            headers: {
                'Content-Type' :'application/json',
                'Authorization' :`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        console.log(response.data);
        return response.data;
        
    }
    catch(error){
        console.log(error);    
        throw error  
    }
}