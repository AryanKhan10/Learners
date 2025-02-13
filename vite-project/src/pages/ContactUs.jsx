import React from 'react'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
    <div className="container mx-auto min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - Contact Information */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center text-white space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-gray-400 text-lg">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email Us</h3>
              <p className="text-gray-400">cs.aryan.uet@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Visit Us</h3>
              <p className="text-gray-400">123 Innovation Street, Tech City</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Call Us</h3>
              <p className="text-gray-400">+92 3159420360</p>
            </div>
          </div>
        </div>
      </div>

        <div className="mb-10 lg:my-32 me-10">
      <ContactForm/>

        </div>
      </div>

      <Footer/>
      </div>
  )
}

export default ContactUs
