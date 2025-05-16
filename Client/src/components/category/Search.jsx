import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Search = ({ setSearchQuery }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [locations, setLocations] = useState([]);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/services/addresses"
        );
        const uniqueAddresses = [...new Set(response.data.addresses)];
        const addressList = uniqueAddresses.map((address) => ({
          location: address,
        }));
        setLocations(addressList);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    setSearchQuery(value); // Update the parent component with the search input
  };

  const startRecording = () => {
    setIsRecording(true);
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setIsRecording(false);
      performVoiceSearch(speechToText);
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const performVoiceSearch = async (query) => {
    setSearchInput(query);
    setSearchQuery(query);
    try {
      await axios.post("http://localhost:4000/api/services/search", { query });
    } catch (error) {
      console.error("Error searching for services:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 lg:justify-center px-4 sm:px-6 md:px-8">
      {/* Search and Dropdown Section */}
      <div className="flex flex-col lg:flex-row h-auto lg:h-[55px] lg:w-[480px] w-full justify-between items-center rounded-3xl border border-[#060640] p-2 shadow-md">
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search for places..."
          className="border-none focus:outline-none focus:ring-0 focus:border-none w-full lg:w-60 mb-2 lg:mb-0"
        />
        <div className="border-t border-black border-[1px] w-full lg:w-auto h-[1px] lg:h-[25px]"></div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center px-4 py-2 text-gray-700 bg-white rounded-full focus:outline-none"
          >
            Select Address
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-[1000]"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                <ul className="py-1 text-gray-700">
                  {locations.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSearchQuery(item.location)}
                    >
                      {item.location}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="p-2 text-white bg-[#060640] rounded-3xl focus:outline-none mt-2 lg:mt-0">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>

      {/* Voice Search Section */}
      <div className="relative w-full lg:w-auto">
        <motion.button
          className={`w-full lg:w-auto p-2 text-white ${
            isRecording ? "bg-red-500" : "bg-[#060640]"
          } font-bold rounded-xl`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
        >
          {isRecording ? "Recording..." : "Record Voice Filter"}
        </motion.button>
        {audioURL && (
          <audio ref={audioRef} controls className="mt-2">
            <source src={audioURL} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default Search;
