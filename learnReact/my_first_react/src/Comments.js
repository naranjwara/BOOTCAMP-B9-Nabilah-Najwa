import React, { Component } from 'react';

// Komponen Comments untuk menampilkan isi kolom komentar
class Comments extends Component {
    render() {  
        // Ambil prop  
        const { data, handleLikeClick } = this.props;
        
        return (
            <div className="ui comments">
            <h3 className="ui dividing header">Comments</h3>
            {/* Mengambil data dari Main.js */}
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
                    {/* Memanggil dan menggunakan fungsi handleLikeClick() */}
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
