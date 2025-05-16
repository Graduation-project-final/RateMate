import React from "react";

const ContactUs = () => {
  return (
    <div className="relative bg-gradient-to-r from-[#060640] via-[#515161] to-[#FADED9] overflow-hidden min-h-screen">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-opacity-50 bg-cover"
          style={{ backgroundImage: "url(/path/to/background-image.jpg)" }}
        ></div>
      </div>
      <div className="relative container mx-auto px-4 py-16 max-w-7xl z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-white mb-8 tracking-wider drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-2xl text-white max-w-3xl mx-auto font-light leading-relaxed">
            We’d love to hear from you! Fill out the form below or reach out to
            us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl backdrop-blur-md transform transition-all hover:scale-105 hover:shadow-lg">
            <h2 className="text-4xl font-semibold mb-6 text-[#060640]">
              Get in Touch
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060640] focus:border-[#060640] sm:text-sm transition-all duration-300 transform hover:scale-105"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060640] focus:border-[#060640] sm:text-sm transition-all duration-300 transform hover:scale-105"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060640] focus:border-[#060640] sm:text-sm transition-all duration-300 transform hover:scale-105"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#060640] focus:border-[#060640] sm:text-sm transition-all duration-300 transform hover:scale-105"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-[#060640] to-[#515161] text-white font-semibold rounded-lg shadow-md hover:bg-[#515161] focus:outline-none focus:ring-2 focus:ring-[#060640] focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl backdrop-blur-md transform transition-all hover:scale-105 hover:shadow-lg">
            <h2 className="text-4xl font-semibold mb-6 text-[#060640]">
              Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              <strong className="text-[#060640]">Address:</strong> 1234 Main
              Street, Amman, Jordan
            </p>
            <p className="text-gray-700 mb-4">
              <strong className="text-[#060640]">Phone:</strong> (123) 456-7890
            </p>
            <p className="text-gray-700 mb-4">
              <strong className="text-[#060640]">Email:</strong>{" "}
              contact@yourdomain.com
            </p>
            <div className="mt-6 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12600.849122911834!2d35.93035!3d31.95317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150f8b2e4b6f6c1d%3A0xd80f3c27b091790!2sAmman%2C%20Jordan!5e0!3m2!1sen!2suk!4v1623420393341!5m2!1sen!2suk"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-40"></div>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-white py-16 rounded-lg shadow-xl transform transition-all hover:scale-105">
          <div className="text-center text-[#060640] max-w-3xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-4">Explore Our Shop</h2>
            <p className="text-2xl mb-8">
              Check out our latest products and offers. Visit our shop for
              exclusive deals and more.
            </p>
            <a
              href="/shop"
              className="inline-block py-4 px-8 bg-gradient-to-r from-[#060640] to-[#515161] text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 transform hover:scale-110"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
