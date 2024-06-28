import axios from 'axios';

// Intance Axios dengan konfigurasi dasar untuk Unsplash API
const unsplash = axios.create({
    baseURL: 'https://api.unsplash.com', // Base URL untuk endpoint API
    headers: {
      Authorization: 'Client-ID KLEDge54jKCBuF-KDl9TkZ7RgUiC9yJSBtZeEMksBUg',
    },
})

export default unsplash; // Ekspor intance Axios sebagai module