import React, { useState } from 'react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const togglePricing = () => setIsYearly(!isYearly);

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-300 to-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-white text-center mb-12">Choose Your Perfect Plan</h1>

        {/* Toggle Pricing Button */}
        <div className="text-center mb-10">
          <button
            onClick={togglePricing}
            className="px-8 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
          >
            {isYearly ? 'Switch to Monthly Billing' : 'Switch to Yearly Billing'}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Pricing Card 1 */}
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full transform hover:scale-105 transition duration-300 relative">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(https://source.unsplash.com/featured/?book)' }}></div>
            
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Basic Plan</h2>
            <p className="text-gray-600 mb-6">Perfect for individuals just starting out.</p>
            <p className="text-5xl font-bold mb-6 text-blue-500">
              ${isYearly ? '199' : '19'} <span className="text-xl text-gray-600">/ {isYearly ? 'year' : 'month'}</span>
            </p>
            <ul className="list-none mb-8">
              <li className="flex items-center mb-3">
                <span className="mr-2 text-blue-500">✔</span> Interactive User Experience
              </li>
              <li className="flex items-center mb-3">
                <span className="mr-2 text-blue-500">✔</span> Fast Exchange Algorithm
              </li>
              <li className="flex items-center mb-3">
                <span className="mr-2 text-blue-500">✔</span> Email Support
              </li>
            </ul>
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => alert('Basic Plan Selected')}
            >
              Get Started
            </button>
          </div>

          {/* Pricing Card 2 */}
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full transform hover:scale-105 transition duration-300 relative">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(https://source.unsplash.com/featured/?team)' }}></div>

            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Standard Plan</h2>
            <p className="text-gray-600 mb-6">Perfect for small teams and growing businesses.</p>
            <p className="text-5xl font-bold mb-6 text-blue-500">
              ${isYearly ? '499' : '49'} <span className="text-xl text-gray-600">/ {isYearly ? 'year' : 'month'}</span>
            </p>
            <ul className="list-none mb-8">
              <li className="flex items-center mb-3">
                <span className="mr-2 text-blue-500">✔</span> Book Refund on Damage
              </li>
              <li className="flex items-center mb-3">
                <span className="mr-2 text-blue-500">✔</span> Fast Exchange Algorithm
              </li>
              <li className="flex items-center mb-3">
                <span className="mr-2 text-blue-500">✔</span> Priority Support
              </li>
            </ul>
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => alert('Standard Plan Selected')}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
              <h3 className="font-semibold text-gray-800">What is included in the Basic Plan?</h3>
              <p className="text-gray-600 mt-2">
                The Basic Plan includes email support, fast exchange algorithms, and user interactivity tools.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
              <h3 className="font-semibold text-gray-800">Can I upgrade my plan later?</h3>
              <p className="text-gray-600 mt-2">
                Yes, you can upgrade your plan at any time by contacting our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
