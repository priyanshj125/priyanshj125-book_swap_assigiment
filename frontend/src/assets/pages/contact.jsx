import React from 'react';

const Contact = () => {
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
              action="#" 
              method="POST"
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
            </form>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
           
            <p className="text-lg text-gray-600 mb-4">
              <strong>Phone:</strong> +91-9335275496
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Email:</strong> support@bookexchange.com<br/>
              <strong>Email-Personal:</strong> priyanshjain8491@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
