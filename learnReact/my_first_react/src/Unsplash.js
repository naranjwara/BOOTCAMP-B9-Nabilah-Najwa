import axios from 'axios';

// Intance Axios dengan konfigurasi dasar untuk Unsplash API
const unsplash = axios.create({
    baseURL: 'https://api.unsplash.com', // Base URL untuk endpoint API
    headers: {
      Authorization: 'Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296',
    },
})

export default unsplash; // Ekspor intance Axios sebagai module