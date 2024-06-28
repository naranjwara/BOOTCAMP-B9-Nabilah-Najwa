import React, { useEffect, useState, useRef } from "react";
import unsplash from './Unsplash'; // Pastikan file import sesuai dengan struktur proyek

// Inisialisasi komponen Gallery
const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const imgRefs = useRef([]); // Ref untuk menyimpan referensi ke setiap elemen gambar

    // useEffect untuk memuat data foto-foto
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // Permintaan GET ke API Unsplash
                const response = await unsplash.get('/search/photos', {
                    params: {
                        query: 'Cat', // Kata kunci pencarian
                        per_page: 25, // Jumlah foto yang diambil
                    },
                });

                setPhotos(response.data.results); // Menyimpan data foto dalam state
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchPhotos();
    }, []);

    // Memanfaatkan createRef untuk setiap elemen gambar
    useEffect(() => {
        imgRefs.current = imgRefs.current.slice(0, photos.length); // Menyamakan panjang ref dengan jumlah foto
    }, [photos]);

    return (
        <div className="gallery-container">
            <div className="row">
                {photos.map((photo, index) => (
                    <div key={photo.id} className="col-md-4">
                        <div className="gallery-item">
                            <img
                                ref={el => imgRefs.current[index] = el}
                                src={photo.urls.small}
                                alt={photo.description}
                                className="gallery-image"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    );
};

// Ekspor komponen sebagai module
export default Gallery;
