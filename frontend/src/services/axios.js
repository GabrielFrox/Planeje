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

export const getTest = async () => {
  try {
    const result = await api.get('/user/64bacd0ddddf94ea1ba0d49f');
    return result;
  } catch (error) {
    console.log(error);
  }
}
