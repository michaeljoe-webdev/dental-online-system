import React, { useState } from 'react';
import './ContactPage.css';
import Swal from 'sweetalert2';

function ContactUs() {
  const formsFree = import.meta.env.VITE_APP_FORM_URL;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    msg: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(async () => {
      // Using Formsfree
      try {
        await fetch(formsFree, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } catch (error) {
        console.error(error);
      }
    }, 4000);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Message sent",
      showConfirmButton: false,
      timer: 1000
    });

    setFormData({ 
      name: '',
      email: '',
      msg: '',
    })
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="contact-input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className="contact-input"
          />
          <textarea
            name="msg"
            value={formData.msg}
            onChange={handleChange}
            required
            placeholder="Your Message"
            className="contact-input"
          />
          <button type="submit" className="contact-button">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
