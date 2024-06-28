import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'AIzaSyBZuEKvFdDG_f3j4BRerLee3saM9z-G0xU'; 
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

// Fungsi untuk mengambil video dari API YouTube
const fetchYouTubeVideos = async (searchQuery, maxResults = 25) => {
  try {
    const { data } = await axios(API_URL, {
      params: {
        key: API_KEY,
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        maxResults,
      },
    });
    return data.items;
  } catch (error) {
    console.error('Error fetching Youtube data', error);
    return [];
  }
}


const App = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Menyimpan query pencarian
  const [videos, setVideos] = useState([]); // Menyimpan daftar video
  const [currentVideo, setCurrentVideo] = useState(null); // Menyimpan video yang sedang diputar
  const currentVideoRef = useRef(null); // Referensi untuk elemen video yang sedang diputar

  // Mengambil video default pada render pertama
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

  // Menangani submit pencarian
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const videosData = await fetchYouTubeVideos(searchQuery);
    setVideos(videosData);
    setCurrentVideo(videosData.length > 0 ? videosData[0] : null)
  }

  // Menangani klik di thumbnails video 
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
