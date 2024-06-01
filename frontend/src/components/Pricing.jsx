import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
    const navigateBtn = useNavigate()
const goToSignupPage = ()=>{
    navigateBtn('/signup')
}

  const togglePricing = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center mb-12">
          <div className="w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Billing Cycle</h2>
              <button 
                onClick={togglePricing}
                className={`w-full py-2 mb-2 rounded-lg font-semibold transition duration-300 ${isMonthly ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-900'}`}
              >
                Monthly
              </button>
              <button 
                onClick={togglePricing}
                className={`w-full py-2 rounded-lg font-semibold transition duration-300 ${!isMonthly ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-900'}`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-red-600">Choose the plan that’s right for you</h1>
          <p className="text-xl text-gray-700">Start for free, then add more features as you grow.</p>
        </div>
        <div className="flex flex-wrap justify-center space-x-4">
          {/* Free Plan */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-500">
              <h2 className="text-3xl font-bold mb-4 text-red-600">Free</h2>
              <p className="text-lg text-gray-700 mb-4">Manage tasks and projects</p>
              <p className="text-5xl font-extrabold mb-4 text-gray-900">$0</p>
              <ul className="mb-8 text-gray-700">
                <li className="mb-2">Up to 5 projects</li>
                <li className="mb-2">Up to 5 users per project</li>
                <li className="mb-2">Basic features</li>
              </ul>
              <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300" onClick={goToSignupPage}>Get Started</button>
            </div>
          </div>
          {/* Pro Plan */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-500">
              <h2 className="text-3xl font-bold mb-4 text-red-600">Pro</h2>
              <p className="text-lg text-gray-700 mb-4">For professionals and small teams</p>
              <p className="text-5xl font-extrabold mb-4 text-gray-900">
                {isMonthly ? '$4/month' : '$50/year'}
              </p>
              <ul className="mb-8 text-gray-700">
                <li className="mb-2">Up to 300 projects</li>
                <li className="mb-2">Up to 25 users per project</li>
                <li className="mb-2">Limited integration with 3rd party apps</li>
                <li className="mb-2">Advanced features</li>
              </ul>
              <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300">Get Pro</button>
            </div>
          </div>
          {/* Business Plan */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-500">
              <h2 className="text-3xl font-bold mb-4 text-red-600">Business</h2>
              <p className="text-lg text-gray-700 mb-4">For larger teams and organizations</p>
              <p className="text-5xl font-extrabold mb-4 text-gray-900">
                {isMonthly ? '$10/month' : '$75/year'}
              </p>
              <ul className="mb-8 text-gray-700">
                <li className="mb-2">Unlimited projects</li>
                <li className="mb-2">Unlimited users</li>
                <li className="mb-2">Integration with 3rd party apps</li>
                <li className="mb-2">Full history available</li>
                <li className="mb-2">All features</li>
              </ul>
              <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300">Get Business</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
