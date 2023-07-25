import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

export const registerNewUser = async (payload) => {
  try {
    const result = await api.post('/user/register', payload);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const login = async (payload) => {
  try {
    const result = await api.post('/user', payload);
    return result;
  } catch (error) {
    // console.log(error);
    return error.response;
  }
}
