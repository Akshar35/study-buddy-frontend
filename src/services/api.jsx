import axios from 'axios';

// Change this when backend is deployed
const API_URL = 'https://study-buddy-backend2-production.up.railway.app/api';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/files/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const sendMessage = async (message) => {
  const response = await axios.post(`${API_URL}/chat`, {
    message: message,
  });

  return response.data;
};

export const testAPI = async () => {
  const response = await axios.get(`${API_URL}/files/test`);
  return response.data;
};