import axios from 'axios'

export const registerHandler = async(user)=>{
    return await axios.post('https://arthit-vibration-iot.herokuapp.com/api' + '/register',user);
}

export const loginHandler = async(user)=>{
  return await axios.post('https://arthit-vibration-iot.herokuapp.com/api' + '/login',user);
}

export const currentUser = async(token)=>{
  return await axios.post('https://arthit-vibration-iot.herokuapp.com/api' + '/current-user',{token})
}