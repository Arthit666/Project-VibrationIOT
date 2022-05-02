import axios from 'axios'

export const createMachine = async(formData)=>{
    return await axios.post(`https://arthit-vibration-iot.herokuapp.com/api/machine/create`,formData);
}

export const getMachineList = async()=>{
    return await axios.get(`https://arthit-vibration-iot.herokuapp.com/api/machine`,{});
}

export const getStatusMachine = async()=>{
    return await axios.get(`https://arthit-vibration-iot.herokuapp.com/api/machine/status`,{});
}

export const getOneMachine = async(id)=>{
    return await axios.get(`https://arthit-vibration-iot.herokuapp.com/api/machine/${id}`,{});
}

export const deleteMachine = async(id)=>{
    return await axios.delete(`https://arthit-vibration-iot.herokuapp.com/api/machine/${id}`,{});
}

export const updateMachine = async(id,formData)=>{
    return await axios.put(`https://arthit-vibration-iot.herokuapp.com/api/machine/${id}`,formData);
}

export const loadDataChart = async()=>{
    return await axios.get("https://arthit-fastapi-vibration-iot.herokuapp.com/vibration",{})
}