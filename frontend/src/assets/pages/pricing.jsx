import React from 'react';

const Pricing = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Our Pricing Plans</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Pricing Card 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Basic Plan</h2>
            <p className="text-gray-600 mb-4">Ideal for individuals just starting out.</p>
            <p className="text-4xl font-bold mb-4">$19 <span className="text-lg text-gray-600">/ month</span></p>
            <ul className="list-disc list-inside mb-6">
              <li className="mb-2">interting user</li>
              <li className="mb-2">fast exchange algo use</li>
              <li className="mb-2">Email Support</li>
            </ul>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Get Started
            </button>
          </div>

          {/* Pricing Card 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Standard Plan</h2>
            <p className="text-gray-600 mb-4">Perfect for small teams and growing businesses.</p>
            <p className="text-4xl font-bold mb-4">$49 <span className="text-lg text-gray-600">/ month</span></p>
            <ul className="list-disc list-inside mb-6">
              <li className="mb-2">book refund on damage</li>
              <li className="mb-2">fast exchange algo use</li>
              <li className="mb-2">Priority Support</li>
            </ul>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Get Started
            </button>
          </div>

          {/* Pricing Card 3 */}
        
        </div>
      </div>
    </div>
  );
}

export default Pricing;
