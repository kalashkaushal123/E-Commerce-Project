import React from 'react'

function Contact() {
  return (
    <div className="w-full min-h-screen px-6 md:px-24 py-16 bg-[#fffbfb] dark:bg-black">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#d6336c] mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our
          products, need help, or just want to share feedback — feel free to
          reach out.
        </p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-[#d6336c] mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our support team is available to help you with any beauty-related
              queries or order issues.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              📍 <span className="font-semibold">Address:</span> New Delhi, India
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              📧 <span className="font-semibold">Email:</span> support@glowbeauty.com
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              📞 <span className="font-semibold">Phone:</span> +91 98765 43210
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-[#181818] p-8 rounded-2xl shadow-lg">
          <form className="space-y-6">
            
            <div>
              <label className="block mb-2 text-sm font-medium dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 dark:bg-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d6336c]"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 dark:bg-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d6336c]"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium dark:text-gray-300">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 dark:bg-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d6336c]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#d6336c] text-white py-3 rounded-lg font-semibold hover:bg-[#b82a5c] transition"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>
    </div>

  )
}

export default Contact
