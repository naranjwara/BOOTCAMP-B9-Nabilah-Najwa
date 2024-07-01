import React, { useEffect, useState, useRef } from "react";
import unsplash from './Unsplash'; 

/**
 * Komponen Gallery menampilkan foto Kucing diambil dari Unsplash dengan ukuran kecil dan beserta deskripsinnya.
 * 
 * @component
 * @example * 
 *  return (
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
 */

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const imgRefs = useRef([]); 
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await unsplash.get('/search/photos', {
                    params: {
                        query: 'Cat', 
                        per_page: 25, 
                    },
                });

                setPhotos(response.data.results); 
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchPhotos();
    }, []);

    useEffect(() => {
        imgRefs.current = imgRefs.current.slice(0, photos.length); 
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

export default Gallery;
