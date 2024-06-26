import React, {Component} from "react";

// Inisialisasi komponen Clock untuk format jam digital
class Clock extends Component {
    constructor(props){
        super(props);
        // Inisialisasi state dengan waktu saat ini
        this.state = {
            time: new Date().toLocaleTimeString()
        }
    }

    // Metode yang dipanggil setelah komponen dirender
    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    // Metode yang dipanggil sebelum komponen dihapus dari DOM
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    // Pembaharuan state time dengan waktu saat ini
    tick(){
        this.setState({
            time: new Date().toLocaleTimeString()
        });
    }

    // Merender tampilan komponen
    render(){
        return (
            <div>
                <h2>{this.state.time}</h2>
            </div>
        )
    }
}

export default Clock;
