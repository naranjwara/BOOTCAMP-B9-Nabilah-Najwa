import React, { Component} from 'react';
import Comments from './Comments'; 
import { faker } from '@faker-js/faker';

// Inisialisasi komponen Main dengan properti
class Main extends Component {
    constructor(props) {
        super(props);
        
        // Inisialisasi state dengan data faker 
        this.state = {
            data: Array.from({ length: 9 }).map(() => ({
                avatar: faker.image.avatar(),
                name: faker.name.firstName(),
                date: "Today",
                words: faker.lorem.words(),
                like: 0
            }))
        };
    }

    // Fungsi menangani peningkatan jumlah like
    handleLikeClick = (index) => {
        this.setState(prevState => {
            const newData = [...prevState.data];
            newData[index] = {
                ...newData[index],
                like: newData[index].like + 1
            };
            return { data: newData };
        });
    }
    
    render() {
        return (
            <div>
            <h1>Data Display</h1>
            {/* Menampilkan komponen Comments dengan prop data dan handleLikeClick */}
            <Comments data={this.state.data} handleLikeClick={this.handleLikeClick}/> 
            </div>
        );
    }
}

// Ekspor Main sebagai module
export default Main;