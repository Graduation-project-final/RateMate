import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  User,
  MessageSquare,
  ChevronRight,
  Contact2,
} from "lucide-react";

function Contact() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/contacts");
        if (response.data && response.data.length > 0) {
          // Assuming you get an array of contacts, pick the first one
          const contactData = response.data[0];
          setContact({
            name: contactData.name,
            email: contactData.email,
            phone_number: contactData.phone_number,
          });
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContactData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const payload = {
      name: userName,
      email: userEmail,
      message: userMessage,
    };

    try {
      const response = await fetch("http://localhost:4000/api/createMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your message has been sent successfully.",
        confirmButtonText: "Okay",
      });

      setUserName("");
      setUserEmail("");
      setUserMessage("");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Overlay Gradient */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(../src/assets/images/contact.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#060640] to-transparent opacity-80"></div>
        <div className="relative h-full flex flex-col justify-center px-8 max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <nav className="flex items-center text-white text-sm">
            <Link to="/" className="flex items-center hover:underline">
              Home
              <ChevronRight size={16} className="mx-1" />
            </Link>
            <span>Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Contact Info Card */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <div className="absolute inset-0 bg-[#060640] opacity-90 z-0"></div>
            <div className="relative z-10 p-8 md:p-12 text-white">
              <div className="flex items-center mb-6">
                <Contact2 size={32} className="mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold">Get in Touch</h2>
              </div>

              <p className="mb-10 text-gray-200">
                Have questions or need assistance? We're here to help! Reach out
                to us using any of the contact methods below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Our Location</h3>
                    <p className="text-gray-200 mt-1">
                      {contact.name || "Location not available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Phone Number</h3>
                    <a
                      href={`tel://${contact.phone_number}`}
                      className="text-gray-200 mt-1 block hover:text-white hover:underline transition"
                    >
                      {contact.phone_number || "Phone number not available"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email Address</h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-gray-200 mt-1 block hover:text-white hover:underline transition"
                    >
                      {contact.email || "Email not available"}
                    </a>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full"></div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-[#060640] mb-6">
              Send Us a Message
            </h3>
            <p className="text-gray-600 mb-8">
              We'd love to hear from you! Fill out the form below and we'll get
              back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-[#060640] border border-gray-300 focus:border-[#060640] focus:ring-1 focus:ring-[#060640] outline-none transition-all"
                  onChange={(event) => setUserName(event.target.value)}
                  value={userName}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-[#060640] border border-gray-300 focus:border-[#060640] focus:ring-1 focus:ring-[#060640] outline-none transition-all"
                  onChange={(event) => setUserEmail(event.target.value)}
                  value={userEmail}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare size={18} className="text-gray-400" />
                </div>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Your Message"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-[#060640] border border-gray-300 focus:border-[#060640] focus:ring-1 focus:ring-[#060640] outline-none transition-all"
                  onChange={(event) => setUserMessage(event.target.value)}
                  value={userMessage}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center w-full rounded-lg bg-[#060640] px-6 py-3 text-white font-medium transition-all hover:bg-[#0a0a60] hover:shadow-lg disabled:opacity-70"
                >
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
