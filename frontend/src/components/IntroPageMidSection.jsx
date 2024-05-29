import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'tailwindcss/tailwind.css';

//import images
import img0 from '../assets/images/intro page images/0.jpg'
import img1 from '../assets/images/intro page images/1.jpg'
import img2 from '../assets/images/intro page images/2.jpg'
import img3 from '../assets/images/intro page images/3.jpg'

import logo1 from '../assets/images/partners/1.png'
import logo2 from '../assets/images/partners/2.png'
import logo3 from '../assets/images/partners/3.png'
import logo4 from '../assets/images/partners/4.png'
import logo5 from '../assets/images/partners/5.png'
import { useNavigate } from 'react-router-dom';

const images = [
  img0, // Hero image
  img1, // Feature 1 image
  img2, // Feature 2 image
  img3  // Feature 3 image
];

const logos = [
logo1 , logo2 , logo3 , logo4 , logo5
]
const IntroPageMidSection = () => {

const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleclick = ()=>{
        navigate('/signup')
  }
  return (
    <div className="home-container">
      {/* Section 1: Hero */}
      <section className="hero bg-gray-100 py-20" data-aos="fade-up">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Organize Your Work & Life</h1>
          <p className="text-gray-600 mb-8">
            Trusted by millions of people and teams. Finally become focused, organized, and calm.
          </p>
          <img src={images[0]} alt="Productivity" className="mx-auto rounded-lg shadow-lg" style={{
            height : '750px' ,
            width : 'inherit'
          }}/>
        </div>
      </section>

      {/* Section 2: Features */}
      <section className="features py-20 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Features</h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-4 mb-8" data-aos="fade-right">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                <img src={images[1]} alt="Feature 1" className="w-full h-40 object-cover mb-4 rounded-lg"/>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Task Management</h3>
                <p className="text-gray-600">Keep track of your tasks and projects with ease. Set priorities, deadlines, and reminders.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8" data-aos="fade-up">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                <img src={images[2]} alt="Feature 2" className="w-full h-40 object-cover mb-4 rounded-lg"/>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Collaboration</h3>
                <p className="text-gray-600">Share tasks and projects with your team. Collaborate seamlessly with comments and file attachments.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8" data-aos="fade-left">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                <img src={images[3]} alt="Feature 3" className="w-full h-40 object-cover mb-4 rounded-lg"/>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Productivity Insights</h3>
                <p className="text-gray-600">Analyze your productivity patterns with detailed reports and gain insights to improve your workflow.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Companies Working with Us */}
      <section className="companies py-20 bg-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Companies Working with Us</h2>
          <div className="flex flex-wrap justify-center items-center space-x-8">
            <img src={logos[0]} alt="Google" className="h-16"/>
            <img src= {logos[1]} alt="Microsoft" className="h-16"/>
            <img src=  {logos[2]} alt="IBM" className="h-16"/>
            <img src= {logos[3]} alt="Netflix" className="h-16"/>
            <img src= {logos[4]} alt="Amazon" className="h-16"/>
          </div>
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <section className="testimonials py-20 bg-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">What Our Users Say</h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-4 mb-8" data-aos="fade-right">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 1" className="w-16 h-16 rounded-full mx-auto mb-4"/>
                <p className="text-gray-600 mb-4">"Todoist has helped me stay organized and meet my deadlines efficiently."</p>
                <p className="text-gray-800 font-bold">- John Doe</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8" data-aos="fade-up">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 2" className="w-16 h-16 rounded-full mx-auto mb-4"/>
                <p className="text-gray-600 mb-4">"The collaboration features are a game changer for our team projects."</p>
                <p className="text-gray-800 font-bold">- Jane Smith</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8" data-aos="fade-left">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <img src="https://randomuser.me/api/portraits/men/47.jpg" alt="User 3" className="w-16 h-16 rounded-full mx-auto mb-4"/>
                <p className="text-gray-600 mb-4">"I love the productivity insights. It really helps me improve my workflow."</p>
                <p className="text-gray-800 font-bold">- Mark Johnson</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Call to Action */}
      <section className="cta bg-red-600 py-20" data-aos="fade-up">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Join millions of users and organize your work and life today.</p>
          <button className="bg-white text-red-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300" onClick={handleclick}>Sign Up for Free</button>
        </div>
      </section>
    </div>
  );
};

export default IntroPageMidSection;
