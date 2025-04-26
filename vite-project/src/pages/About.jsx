import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import HighlightText from '../components/Home/HighlightText'
import Form from '../components/About/Form';
import Footer from '../components/Footer'
import ReviewSlider from '../components/ReviewSlider';
function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className=" px-4 py-16">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Driving Innovation in Online Education for a{' '}
            {/* <span className="text-cyan-400">Brighter Future</span> */}
            <HighlightText text={"Brighter Future"}/>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Learner is at the forefront of driving innovation in online education. We're passionate about creating a 
            brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant 
            learning community.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 me-4">
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" 
              alt="Student studying" 
              className="w-full h-64 object-cover rounded-lg transform transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
              alt="Students collaborating" 
              className="w-full h-64 object-cover rounded-lg transform transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Student learning" 
              className="w-full h-64 object-cover rounded-lg transform transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Animated Text Section */}
        <div className="mt-16 text-center">
          <p className="text-2xl md:text-3xl font-medium mb-4">
            We are passionate about revolutionizing the way we learn. Our innovative platform{' '}
          </p>
          <div className="text-2xl md:text-3xl font-medium">
            combines{' '}
            <TypeAnimation
              sequence={[
                'technology',
                2000,
                'expertise',
                2000,
                'community',
                2000
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-cyan-400"
            />
            {' '}to create an{' '}
            {/* <span className="text-yellow-500">unparalleled educational experience</span>. */}
            <HighlightText text={"unparalleled educational experience"}/>
          </div>
        </div>

         {/* Founding Story Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center mt-20 mx-4">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-6 flex items-center gap-3">
              <span className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                📚
              </span>
              Our Founding Story
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Our e-learning platform was born out of a shared vision and passion for 
                transforming education. It all began with a group of educators, technologists, 
                and lifelong learners who recognized the need for accessible, flexible, and 
                high-quality learning opportunities in a rapidly evolving digital world.
              </p>
              
              <p className="text-lg leading-relaxed">
                As experienced educators ourselves, we witnessed firsthand the limitations 
                and challenges of traditional education systems. We believed that education 
                should not be confined to the walls of a classroom or restricted by 
                geographical boundaries. We envisioned a platform that could bridge these 
                gaps and empower individuals from all walks of life to unlock their full 
                potential.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20 me-4">
          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-cyan-400 mb-2">50K+</div>
            <div className="text-gray-400">Active Learners</div>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-orange-400 mb-2">200+</div>
            <div className="text-gray-400">Expert Instructors</div>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-yellow-400 mb-2">1000+</div>
            <div className="text-gray-400">Interactive Courses</div>
          </div>
        </div>

        <Form/>
            <h2 className="text-center text-gray-100 font-bold py-2 text-3xl">Review from Other Learners</h2>
              <ReviewSlider/>
      </div>
        <Footer/>
    </div>
  )
}

export default About
