import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import fetchYouTubeVideos from './youtubeAPI';

/**
 * Komponen App untuk menampilkan video berdasarkan search query yang diambil dari Youtube Data API
 * 
 * @component
 * @return
 * return (
 *   <App />
 * )
 */

const App = () => {
  // State untuk menyimpan perubahan
  const [searchQuery, setSearchQuery] = useState(''); // Menyimpan query pencarian
  const [videos, setVideos] = useState([]); // Menyimpan daftar default video
  const [currentVideo, setCurrentVideo] = useState(null); // Menyimpan video saat sedang diputar
  const currentVideoRef = useRef(null); // Referensi untuk elemen video saat diputar


  // Menampilkan video default saat halaman pertama kali di render dan query search masih kosong.
  useEffect(() => {
    const fetchDefaultVideos = async () => {
      const defaultVideos = await fetchYouTubeVideos('default search query');
      setVideos(defaultVideos);
      if (defaultVideos.length > 0){
       setCurrentVideo(defaultVideos[0]);
      }
    };

    fetchDefaultVideos();
  }, []);

  // Menampilkan video pertama yang sesuai dengan query search dan set sebagai current video.
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const videosData = await fetchYouTubeVideos(searchQuery);
    setVideos(videosData);
    setCurrentVideo(videosData.length > 0 ? videosData[0] : null)
  }

 
  // Halaman akan bergulir ke atas secara otomatis saat menenkan suatu video
  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    setTimeout(() => {
      currentVideoRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100)
  }

  return (
    <div className="youtube-search-container">
      <h2>YouTube</h2>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query..."
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="video-and-thumbnails">
        {currentVideo && (
          <div className="video-player" ref={currentVideoRef}>
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
            <h3>{currentVideo.snippet.title}</h3>
          </div>
        )}
        <ul className="thumbnail-list">
          {videos.map(video => (
            <li className="thumbnail-item" key={video.id.videoId}>
              <img
                className="thumbnail"
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                onClick={() => handleVideoClick(video)}
              />
              <div className="thumbnail-text">
                <h3 onClick={() => handleVideoClick(video)}>{video.snippet.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
