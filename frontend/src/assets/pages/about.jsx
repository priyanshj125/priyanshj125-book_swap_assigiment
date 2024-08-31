import React from 'react';

const About = () => {
  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Book Exchange Platform</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to our Book Exchange Platform! We are dedicated to providing a seamless and user-friendly platform for students and book lovers to exchange their books.
        </p>
        <div className="flex flex-col lg:flex-row lg:justify-center lg:space-x-8">
          <div className="lg:w-1/2">
            <img 
              src="https://www.shutterstock.com/image-vector/books-exchange-crossing-concept-hands-600nw-2275010403.jpg" 
              alt="Book Exchange" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              Our mission is to create a community-driven platform where users can easily swap books with others. Whether you're looking to find a new read or give away books you no longer need, our platform makes it easy to connect with fellow book enthusiasts.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Simply create an account, list the books you want to exchange, and browse through other users' listings. You can send exchange requests and manage your book collection all in one place. It's that easy!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
