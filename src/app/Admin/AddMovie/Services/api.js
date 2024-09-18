import axios from 'axios'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addMoviesAPI = async(movieData)=>{
    try{
        const response = await axios.post(`${serverUrl}/admin/addMovie`,movieData,{
            headers: {
                'Content-Type' :'multipart/form-data',
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