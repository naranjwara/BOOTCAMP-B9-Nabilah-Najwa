import React, { Component } from 'react';

class DataDisplay extends Component {
    render() {  
        const { data } = this.props;
        
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
                    <a className="reply">Reply</a>
                    </div>
                </div>
                </div>
            ))}
            </div>
        );
    }
};

export default DataDisplay;
