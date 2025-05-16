import React, { useState } from "react";

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Rania Al-Momani",
      company: " Mugs",
      testimonial:
        "I absolutely love my new RateMate mug! It’s my daily companion during work and always puts a smile on my face. The quality is just amazing!",
      image: "./src/assets/images/user1.jpeg",
    },
    {
      name: "Omar Al-Zoubi",
      company: "Jordan Tees",
      testimonial:
        "The t-shirt I got from RateMate is so comfortable and stylish. It’s perfect for everyday wear, and I get compliments every time I wear it. Totally in love!",
      image: "./src/assets/images/user2.jpeg",
    },
    {
      name: "Rami Haddad",
      company: "Medals & More",
      testimonial:
        "The custom medal from RateMate is a true keepsake. It’s beautifully crafted and a perfect reminder of my achievements. Thank you for such a thoughtful product!",
      image: "./src/assets/images/user3.jpeg",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <>
      <div className="relative bg-[#060640] text-white py-16 px-4 sm:px-6 lg:px-8 shadow-lg">
        <h2 className="text-5xl font-extrabold mb-12 text-center">
          what our testimonials says?
        </h2>
        <div className="relative flex items-center justify-center">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 z-10 p-4 bg-gradient-to-r from-[#FADED9] to-[#515161] text-[#060640] rounded-full shadow-xl transform hover:scale-110 transition-transform duration-300 focus:outline-none"
            aria-label="Previous Testimonial"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="relative bg-[#515161] rounded-[50px] p-12 w-full max-w-3xl mx-4 sm:mx-6 lg:mx-8 transition-transform transform hover:scale-105 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FADED9] to-[#060640] rounded-t-3xl"></div>
            <div className="flex flex-col md:flex-row items-center mb-6">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-28 h-28 rounded-full mb-4 md:mb-0 md:mr-8 flex-shrink-0 object-cover shadow-lg"
              />
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-3xl mb-2">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-[#FADED9] text-xl mb-4">
                  {testimonials[currentIndex].company}
                </p>
                <p className="text-gray-200 text-lg italic">
                  "{testimonials[currentIndex].testimonial}"
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 z-10 p-4 bg-gradient-to-r from-[#FADED9] to-[#515161] text-[#060640] rounded-full shadow-xl transform hover:scale-110 transition-transform duration-300 focus:outline-none"
            aria-label="Next Testimonial"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center mt-10">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 mx-1 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-[#FADED9] to-[#515161] w-6"
                  : "bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TestimonialCarousel;
