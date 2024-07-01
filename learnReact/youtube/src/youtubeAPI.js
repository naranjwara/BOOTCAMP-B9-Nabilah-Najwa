import axios from 'axios';
/**
 * Fungsi untuk fetching data dari Youtube API menggunakan Axios
 * 
 * @param {string} searchQuery - Kata kunci untuk pencarian video di Youtube.
 * @param {number} [maxResults = 25] - Jumlah maksimal hasil pencarian yang dikembalikan.
 * @returns {Promise<Object[]>} Araay objek video yang ditemukan berdasarkan search query.
 * @throws {error} Jika terjadi kesalahan saat fetching data Youtube API.
 */

const API_KEY = 'AIzaSyBZuEKvFdDG_f3j4BRerLee3saM9z-G0xU'; 
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

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

export default fetchYouTubeVideos;
