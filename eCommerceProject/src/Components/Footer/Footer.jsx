import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#fce8ea] dark:bg-[#121212] border-t border-pink-100 dark:border-[#2a2a2a] bottom-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-[#d6336c]">
              Glow<span className="text-[#333] dark:text-[#f1f1f1]">Beauty</span>
            </h2>
            <p className="mt-3 text-[#555] dark:text-[#b5b5b5]">
              Premium beauty & skincare products made to enhance your natural glow.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-[#333] dark:text-[#f1f1f1] mb-3">
              Shop
            </h3>
            <ul className="space-y-2 text-[#555] dark:text-[#b5b5b5]">
              <li className="hover:text-[#d6336c] cursor-pointer">Makeup</li>
              <li className="hover:text-[#d6336c] cursor-pointer">Skincare</li>
              <li className="hover:text-[#d6336c] cursor-pointer">Hair Care</li>
              <li className="hover:text-[#d6336c] cursor-pointer">Fragrance</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-[#333] dark:text-[#f1f1f1] mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-[#555] dark:text-[#b5b5b5]">
              <li className="hover:text-[#d6336c] cursor-pointer">About Us</li>
              <li className="hover:text-[#d6336c] cursor-pointer">Careers</li>
              <li className="hover:text-[#d6336c] cursor-pointer">Privacy Policy</li>
              <li className="hover:text-[#d6336c] cursor-pointer">Terms</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-[#333] dark:text-[#f1f1f1] mb-3">
              Support
            </h3>
            <ul className="space-y-2 text-[#555] dark:text-[#b5b5b5]">
              <li className="hover:text-[#d6336c] cursor-pointer">Contact</li>
              <li className="hover:text-[#d6336c] cursor-pointer">FAQs</li>
              <li className="hover:text-[#d6336c] cursor-pointer">Shipping</li>
              <li className="hover:text-[#d6336c] cursor-pointer">Returns</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-pink-100 dark:border-[#2a2a2a] pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#555] dark:text-[#b5b5b5]">
          <p>© 2025 GlowBeauty. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Made with 💖 for beauty lovers
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
