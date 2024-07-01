import React, { Component } from 'react';

/**
 * Komponen Comments untuk menampilkan isi dari kolom komentar seperti avatar, nama, tanggal, dan jumlah like untuk setiap data yang diambil.
 * 
 * @component
 * @example
 * const data = [
 *   {
 *     avatar: 'https://example.com/avatar1.png',
 *     name: 'John Doe',
 *     date: '2023-06-28',
 *     words: 'Ini adalah komentar.',
 *     like: 5
 *   },
 * ];
 * 
 * const handleLikeClick = (index) => {
 * };
 * 
 * return (
 *   <Comments data={data} handleLikeClick={handleLikeClick} />
 * );
 */

class Comments extends Component {
    render() {  
        /**
         * Memanggil props data dari UserInput agar bisa ditampilkan.
         * Memanggil fungsi handleLikeClick agar jumlah like dapat bertambah saat tombol 'Like' ditekan.
         * 
         * @typedef {Object} Comment
         * @property {string} avatar - URL gambar avatar pengguna.
         * @property {string} name - Nama pengguna.
         * @property {string} date - Tanggal komentar.
         * @property {string} words - Isi komentar.
         * @property {number} like - Jumlah like pada komentar.
         * 
         * @type {Object} props
         * @property {Comment[]} data - Daftar komentar yang akan ditampilkan.
         * @property {function} handleLikeClick - Fungsi yang dipanggil saat tombol 'Like' ditekan, menerima indeks komentar sebagai argumen.
         */
        const { data, handleLikeClick } = this.props;
        
        return (
            <div className="ui comments">
            <h3 className="ui dividing header">Comments</h3>
            {data.map((item, index) => (
                <div className="comment" key={index}>
                <a className="avatar">
                    <img src={item.avatar} alt="avatar" />
                </a>
                <div className="content">
                    <a className="author">{item.name}</a>
                    <div className="metadata">
                    <span className="date">{item.date}</span>
                    </div>
                    <div className="text">
                    {item.words}
                    </div>
                    <div className="actions">
                    <a className="like">{item.like}</a>
                    <button onClick={() => handleLikeClick(index)}>Like</button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        );
    }
};

export default Comments;
