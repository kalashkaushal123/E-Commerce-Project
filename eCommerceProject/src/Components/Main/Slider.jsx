import React, { useEffect, useState } from "react";

const images = [
  "https://thumbs.dreamstime.com/b/horizontal-banner-web-design-top-view-assortment-makeup-products-face-visage-routine-brushes-lipsticks-compact-blush-227701039.jpg",
  "https://thumbs.dreamstime.com/b/make-up-items-pink-color-background-horizontal-web-banner-set-luxury-decorative-cosmetics-flat-lay-top-view-mockup-make-up-161939897.jpg",
  "https://media.istockphoto.com/id/1408439145/photo/autumn-skincare-and-autumn-makeup-concept-with-beauty-products-on-table.jpg?s=612x612&w=0&k=20&c=kuyRQU6vR1uSUZK7GyddjJe1RE1OIQivfILVCn_yAdE=",
  "https://www.shutterstock.com/image-photo/create-banner-beauty-website-highlighting-600nw-2554518055.jpg",
];

function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="dark:bg-black pt-20 px-4">
      <div className="
        relative 
        max-w-7xl 
        mx-auto 
        overflow-hidden 
        rounded-2xl
        h-[200px]
        sm:h-[280px]
        md:h-[350px]
        lg:h-[400px]
      ">

        {/* Image */}
        <img
          src={images[current]}
          alt="slider"
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Prev */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/40 p-2 sm:p-3 rounded-full w-10 sm:w-12"
        >
          ❮
        </button>

        {/* Next */}
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/40 p-2 sm:p-3 rounded-full w-10 sm:w-12"
        >
          ❯
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
                current === index ? "bg-pink-600" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
