import React, { Component} from 'react';
import Comments from './Comments'; 
import { faker } from '@faker-js/faker';

class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: Array.from({ length: 9 }).map(() => ({
                avatar: faker.image.avatar(),
                name: faker.name.firstName(),
                date: "Today",
                words: faker.lorem.words()
            }))
        };
    }  
    
    render() {
        return (
            <div>
            <h1>Data Display</h1>
            <Comments data={this.state.data} /> {/* Use the Comments component */}
            </div>
        );
    }
}


export default Main;
