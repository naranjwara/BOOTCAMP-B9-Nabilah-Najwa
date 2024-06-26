import React, { useEffect } from "react";
import unsplash from './Unsplash' // Impor instance Axios dari 'Unsplash.js'

// Inisialisasi komponen Gallery
const Gallery = () => {
    // useEffect untuk memuat data
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // Permintaan GET ke Api Unsplash
                const response = await unsplash.get('/search/photos', {
                    params: {
                        query: 'Cat', // Kata kunci pencarian
                        per_page: 10, // Jumlah data yang diambil
                    },
                });

                console.log(response.data.results); // Menampilkan dalam format array
            } catch (error) {
                console.error('Error fetching data', error);
            }

        }

        fetchPhotos(); 
    }, []);

    return <div></div>;
}

// Ekspor komponen sebagai module
export default Gallery;