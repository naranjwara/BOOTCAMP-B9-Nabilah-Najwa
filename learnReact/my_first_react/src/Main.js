import React, { Component} from 'react';
import Comments from './Comments'; 
import { faker } from '@faker-js/faker';

/**
 * Komponen Main untuk menampilkan data palsu menggunakan faker-js dan mengelola state data serta aksi 'Like'.
 * 
 * @component
 * @example
 * 
  * class App extends Component {
 *   render() {
 *     return (
 *       <Main />
 *     );
 *   }
 * }
 */

class Main extends Component {
    constructor(props) {
        super(props);
        
        // Inisialisasi state dengan data palsu faker-js.
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

    /**
     * Handle untuk menambahkkan jumlah 'like' pada komentar yang dipilih.
     * @param {number} index - Indeks pada komentar yang akan diberi like.
     */
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
            <Comments data={this.state.data} handleLikeClick={this.handleLikeClick}/> 
            </div>
        );
    }
}

export default Main;