import React from 'react'
import ContactForm from '../ContactForm'

function Form() {
  return (
    <div className="min-h-screen bg-dark bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Get in Touch</h1>
            <p className="text-gray-400">We'd love to hear from you. Please fill out this form.</p>
          </div>

          <ContactForm/>
        </div>
      </div>
    </div>
  )
}

export default Form
