import React from "react";

/**
 * Komponen Content untuk menampilkan konten utama dari halaman web, termasuk bagian home, about, services, dan contact.
 * 
 * @component
 * @example
 *  return (        
      <Content />
    )
 */
const Content = () => {
    return (        
      <main>
      <section id="home">
        <h5>Welcome to My Website</h5>
      </section>
      <section id="about">
        <h5>About Us</h5>
      </section>
      <section id="services">
        <h5>Our Services</h5>
      </section>
      <section id="contact">
        <h5>Contact Us</h5>
      </section>
    </main>
    )
}

export default Content;