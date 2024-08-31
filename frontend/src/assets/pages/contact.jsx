import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/send-email', { name, email, message });
      setStatus('Email sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('Error sending email.');
    }
  };

  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          We’d love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out to us.
        </p>
        <div className="flex flex-col lg:flex-row lg:justify-center lg:space-x-8">
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
            <form 
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="mb-4">
                <label 
                  htmlFor="name" 
                  className="block text-left text-gray-700 text-sm font-semibold mb-2"
                >
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label 
                  htmlFor="email" 
                  className="block text-left text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label 
                  htmlFor="message" 
                  className="block text-left text-gray-700 text-sm font-semibold mb-2"
                >
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Your Message" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Send Message
              </button>
              {status && <p className="mt-4 text-lg font-semibold text-gray-800">{status}</p>}
            </form>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          
            <p className="text-lg text-gray-600 mb-4">
              <strong>Phone:</strong> +91-9335275496
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Email:</strong> support@bookexchange.com<br/>
              <strong>developer Email:</strong> priyasnhjain8491@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
