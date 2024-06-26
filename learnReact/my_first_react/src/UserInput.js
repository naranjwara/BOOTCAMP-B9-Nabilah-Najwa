import React, { Component } from 'react';

// Deklarasi kelas komponen FormExample
class FormExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
        name: '', // State name
        mobile: '', // State nomor telepon
        email: '', // State email
        submitted: false, // State status pengiriman formulir
        };
    }

    // Metode menangani perubahan input
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };  

    // Metode menangani formulir
    handleSubmit = (event) => {
        event.preventDefault();
        const { name, mobile, email } = this.state;
        if (name && mobile && email) {
            this.setState({ submitted: true });
            alert(`Data yang telah diinput:\nNama: ${name}, Nomor Telepon: ${mobile}, Alamat Email: ${email}`);
          } else {
            alert('Mohon lengkapi semua kolom sebelum mengirim.');
          }
    };

    // Metode render menampilkan komponen
    render() {
        const { name, mobile, email, submitted } = this.state;
        return ( 
        <div>
            <form onSubmit={this.handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nama"
                value={name}
                onChange={this.handleInputChange}
            />
            <input
                type="tel"
                name="mobile"
                placeholder="Nomor Telepon"
                value={mobile}
                onChange={this.handleInputChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Alamat Email"
                value={email}
                onChange={this.handleInputChange}
            />
            <button type="submit">Submit</button>
            </form>
            {submitted && <p style={{ color: 'green' }}>Data berhasil diisi!</p>}
        </div>
        );
    }
}

// Ekspor komponen FormExample sebagai module
export default FormExample;
