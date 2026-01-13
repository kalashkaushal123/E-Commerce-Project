import React, { useEffect, useState } from 'react'

function About() {
  const [teamData, setTeamData] = useState([]);
  const team = [
    { id: 1, name: "Kalash Kaushal", img: "https://images.pexels.com/photos/18560962/pexels-photo-18560962.jpeg?auto=compress&cs=tinysrgb&w=200&h=200", post: "Frontend Developer" },
    { id: 2, name: "Ananya Sharma", img: "https://randomuser.me/api/portraits/women/2.jpg", post: "UI/UX Designer" },
    { id: 3, name: "Rohit Verma", img: "https://randomuser.me/api/portraits/men/3.jpg", post: "Backend Developer" },
    { id: 4, name: "Kalash Kaushal", img: "https://images.pexels.com/photos/18560962/pexels-photo-18560962.jpeg?auto=compress&cs=tinysrgb&w=200&h=200", post: "Frontend Developer" },
    { id: 5, name: "Ananya Sharma", img: "https://randomuser.me/api/portraits/women/2.jpg", post: "UI/UX Designer" },
    { id: 6, name: "Rohit Verma", img: "https://randomuser.me/api/portraits/men/3.jpg", post: "Backend Developer" }
  ];
  useEffect(()=>{
    setTeamData(team)
  },[])
  return (
    <div>
      <div className="px-[8em] py-[4em] bg-[#fff8f8] dark:bg-black text-gray-800 dark:text-gray-100 min-h-screen">
      
      {/* Page Heading */}
      <h1 className="text-4xl font-bold mb-6 text-[#d6336c]">
        About GlowBeauty
      </h1>

      {/* Intro Section */}
      <p className="text-lg mb-6 leading-relaxed">
        Welcome to <span className="font-semibold">GlowBeauty</span>, your ultimate online destination for high-quality beauty products. 
        Our mission is to help you shine every day with the best skincare and makeup essentials.At GlowBeauty, we believe that beauty is not just about appearance, but also about confidence, self-expression, and the joy of taking care of yourself. Whether you are a makeup enthusiast, skincare lover, or someone exploring the world of cosmetics for the first time, GlowBeauty provides a carefully curated selection of products that cater to all your beauty needs. Our platform brings together the finest skincare essentials, makeup must-haves, and personal care products from top brands, ensuring that every product meets the highest standards of quality and effectiveness.

        <br /> <br />

        Our mission is to help you shine every day by offering products that enhance your natural beauty while being safe, reliable, and enjoyable to use. We understand that everyone’s skin type, style preferences, and beauty goals are unique, which is why our product range is diverse, inclusive, and designed to cater to a wide variety of tastes. From nourishing skincare to vibrant lipsticks, elegant eyeshadows, and long-lasting mascaras, every item is selected to help you create your perfect beauty routine.

      </p>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        
        {/* Mission */}
        <div className="bg-white dark:bg-[#181818] p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-[#d6336c]">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To provide beauty enthusiasts with premium, affordable products that enhance confidence and self-expression.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white dark:bg-[#181818] p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-[#d6336c]">Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To become the most trusted online beauty platform, offering a seamless shopping experience and a curated selection of top beauty brands.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-[#d6336c]">Meet the Team</h2>

        <div className="flex gap-6 pb-4 overflow-x-auto scrollbar-none">
          {teamData.map((person) => (
            <div
              key={person.name}
              className="min-w-[360px] flex-shrink-0 bg-white dark:bg-[#181818] p-6 rounded-2xl shadow-md text-center hover:scale-105 transition"
            >
              <img
                src={person.img}
                alt={person.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold dark:text-white">{person.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{person.post}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
    </div>
  )
}

export default About
