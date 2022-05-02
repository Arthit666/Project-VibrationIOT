import axios from 'axios'

export const getUser = async(id)=>{
    return await axios.get(`https://arthit-vibration-iot.herokuapp.com/api/user/${id}`,{});
}

export const updateUser = async(formData,id)=>{
    return await axios.put(`https://arthit-vibration-iot.herokuapp.com/api/user/${id}`,formData);
}

export const deleteUser = async (id) =>{
    return await axios.delete(`https://arthit-vibration-iot.herokuapp.com/api/user/${id}`,);
}