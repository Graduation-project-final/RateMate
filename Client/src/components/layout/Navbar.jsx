import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLogOut } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Logo from "../../assets/images/Logo.png";

import { ToastContainer } from "react-toastify";

import { useAuth } from "../../hooks/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHomeServicesOpen, setIsHomeServicesOpen] = useState(false);
  const [isAutoServicesOpen, setIsAutoServicesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = (setState) => {
    setState(true);
  };

  const handleMouseLeave = (setState) => {
    setState(false);
  };

  const handleMobileMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />{" "}
      <nav className="bg-white px-10 relative z-50 sticky top-0">
        <div className="container mx-auto flex items-center justify-between">
          <NavLink to="/">
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="h-[100px] w-[100px]" />
            </div>
          </NavLink>
          <div className="hidden md:flex flex-grow text-center justify-center">
            <ul className="flex justify-center space-x-10">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Home
                </NavLink>
              </li>
              {/* 1 */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter(setIsAboutOpen)}
                onMouseLeave={() => handleMouseLeave(setIsAboutOpen)}
              >
                <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900">
                  <NavLink
                    to="/listing/Restaurants"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 underline font-bold flex items-center"
                        : "text-gray-700 flex items-center"
                    }
                  >
                    Restaurants
                  </NavLink>

                  <svg
                    className={`ml-2 w-4 h-4 transition-transform transform ${
                      isAboutOpen ? "rotate-180" : ""
                    }`}
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
                    />
                  </svg>
                </div>
                <AnimatePresence>
                  {isAboutOpen && (
                    <motion.div
                      className="absolute left-0 w-64 mt-2 bg-white border border-gray-200 rounded shadow-lg"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onMouseEnter={() => handleMouseEnter(setIsAboutOpen)}
                      onMouseLeave={() => handleMouseLeave(setIsAboutOpen)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div>
                          <ul>
                            <li>
                              <NavLink
                                to="/category/Restaurants/TakeOut"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                TakeOut
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/Restaurants/Delivery"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Delivery
                              </NavLink>
                            </li>{" "}
                            <li>
                              <NavLink
                                to="/category/Restaurants/Burgers"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Burgers
                              </NavLink>
                            </li>{" "}
                            <li>
                              <NavLink
                                to="/category/Restaurants/Chinese"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Chinese
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        <div className="overflow-y-auto max-h-48">
                          <ul>
                            <li>
                              <NavLink
                                to="/category/Restaurants/Thai"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Thai
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/Restaurants/Italian"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Italian
                              </NavLink>{" "}
                              <NavLink
                                to="/category/Restaurants/Reservations"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Reservations
                              </NavLink>{" "}
                              <NavLink
                                to="/category/Restaurants/Mexican"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Mexican
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              {/* 2 */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter(setIsHomeServicesOpen)}
                onMouseLeave={() => handleMouseLeave(setIsHomeServicesOpen)}
              >
                <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900">
                  <NavLink
                    to="/listing/Services"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 underline font-bold flex items-center"
                        : "text-gray-700 flex items-center"
                    }
                  >
                    Services
                  </NavLink>

                  <svg
                    className={`ml-2 w-4 h-4 transition-transform transform ${
                      isHomeServicesOpen ? "rotate-180" : ""
                    }`}
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
                    />
                  </svg>
                </div>
                <AnimatePresence>
                  {isHomeServicesOpen && (
                    <motion.div
                      className="absolute left-0 w-64 mt-2 bg-white border border-gray-200 rounded shadow-lg"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onMouseEnter={() =>
                        handleMouseEnter(setIsHomeServicesOpen)
                      }
                      onMouseLeave={() =>
                        handleMouseLeave(setIsHomeServicesOpen)
                      }
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div>
                          <ul>
                            <li>
                              <NavLink
                                to="/category/Services/Plumbing"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Plumbing
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/Services/Electrical"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Electrical
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/Services/Cleaning"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Cleaning
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/Services/Landscaping"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Landscaping
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        <div className="overflow-y-auto max-h-48">
                          <ul>
                            <li>
                              <NavLink
                                to="/category/Services/Carpentry"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Carpentry
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/Services/Moving"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Moving
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/Services/Handyman"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Handyman
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/Services/Design"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Design
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              {/* 3 */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter(setIsAutoServicesOpen)}
                onMouseLeave={() => handleMouseLeave(setIsAutoServicesOpen)}
              >
                <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900">
                  <NavLink
                    to="/listing/AutoServices"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 underline font-bold flex items-center"
                        : "text-gray-700 flex items-center"
                    }
                  >
                    Auto Services
                  </NavLink>
                  <svg
                    className={`ml-2 w-4 h-4 transition-transform transform ${
                      isAutoServicesOpen ? "rotate-180" : ""
                    }`}
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
                    />
                  </svg>
                </div>
                <AnimatePresence>
                  {isAutoServicesOpen && (
                    <motion.div
                      className="absolute left-0 w-[26rem] mt-2 bg-white border border-gray-200 rounded shadow-lg"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onMouseEnter={() =>
                        handleMouseEnter(setIsAutoServicesOpen)
                      }
                      onMouseLeave={() =>
                        handleMouseLeave(setIsAutoServicesOpen)
                      }
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div>
                          <ul>
                            <li>
                              <NavLink
                                to="/category/AutoServices/CarMaintenance"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Car Maintenance
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/AutoServices/TireChange"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Tire Change
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/AutoServices/EngineRepair"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Engine Repair
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/AutoServices/OilChange"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Oil Change
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        <div className="overflow-y-auto max-h-48">
                          <ul>
                            <li>
                              <NavLink
                                to="/category/AutoServices/BrakeService"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Brake Service
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/AutoServices/Detailing"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Detailing
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/AutoServices/Inspection"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Inspection
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/AutoServices/EmergencyTowing"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Emergency Towing
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              {/* 4 */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter(setIsMoreOpen)}
                onMouseLeave={() => handleMouseLeave(setIsMoreOpen)}
              >
                <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900">
                  <NavLink
                    to="/listing/More"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-900 underline font-bold flex items-center"
                        : "text-gray-700 flex items-center"
                    }
                  >
                    More
                  </NavLink>
                  <svg
                    className={`ml-2 w-4 h-4 transition-transform transform ${
                      isMoreOpen ? "rotate-180" : ""
                    }`}
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
                    />
                  </svg>
                </div>
                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      className="absolute left-0 w-[22rem] mt-2 bg-white border border-gray-200 rounded shadow-lg"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onMouseEnter={() => handleMouseEnter(setIsMoreOpen)}
                      onMouseLeave={() => handleMouseLeave(setIsMoreOpen)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div>
                          <ul>
                            <li>
                              <NavLink
                                to="/category/More/DryCleaning"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Dry Cleaning
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/More/PhoneRepair"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Phone Repair
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/More/Cafes"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Cafes
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/More/OutdoorActivities"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Outdoor Activities
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        <div className="overflow-y-auto max-h-48">
                          <ul>
                            <li>
                              <NavLink
                                to="/category/More/HairSalons"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Hair Salons
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/More/Gyms"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Gyms
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/More/Spas"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Spas
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/More/Shopping"
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                    isActive ? "font-bold" : ""
                                  }`
                                }
                              >
                                Shopping
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900">
                <NavLink
                  to="/category/list"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold flex items-center"
                      : "text-gray-700 flex items-center"
                  }
                >
                  Category
                </NavLink>
              </div>
            </ul>
          </div>

          {isLoggedIn ? (
            <>
              <div className="flex items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg0F0hqjo2pVSEgusU_JvJ4WOxd-U1QWMnw&usqp=CAU"
                  alt="name"
                  className="mr-4 rounded-full"
                  style={{ width: "40px", height: "40px" }}
                />{" "}
                <FaChevronDown
                  className="cursor-pointer"
                  onClick={toggleDropdown}
                />
              </div>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute mt-28 right-0 w-48 bg-white rounded-md shadow-lg py-2"
                >
                  <Link to="/uprofile">
                    <div
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={handleProfileClick}
                    >
                      <FiUser className="mr-2" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <div
                    onClick={logout}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-2" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center hidden md:block">
                <button
                  onClick={openLogin}
                  className="bg-[#060640] hover:bg-[#060640] hover:opacity-80 text-white font-bold h-8 px-4 rounded-3xl mr-2"
                >
                  LogIn
                </button>
              </div>
              <Login
                isOpen={isLoginOpen}
                onClose={closeLogin}
                onSignUpOpen={openSignUp}
              />
              <Signup
                isOpen={isSignUpOpen}
                onClose={closeSignUp}
                onLoginOpen={openLogin}
              />
            </>
          )}
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900"
            >
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
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-70 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMobileMenu}
              />
              <motion.div
                className="fixed inset-y-0 right-0 w-72 bg-gradient-to-b from-white to-gray-100 shadow-lg z-50 flex flex-col overflow-y-auto max-h-screen"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.4 }}
              >
                <div className="p-6 flex justify-between items-center border-b border-gray-300">
                  <img src={Logo} alt="Logo" className="h-12 w-12" />
                  <button
                    onClick={toggleMobileMenu}
                    className="text-gray-800 hover:text-gray-900"
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
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <ul className="flex flex-col mt-4">
                  <li className="px-6 py-3">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                          : "block text-gray-700 hover:text-gray-900  pl-4"
                      }
                      onClick={toggleMobileMenu}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="relative">
                    <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 px-6 py-3">
                      <NavLink
                        to="/listing/Restaurants"
                        className={({ isActive }) =>
                          isActive
                            ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                            : "block text-gray-700 hover:text-gray-900  pl-4"
                        }
                        onClick={toggleMobileMenu}
                      >
                        Restaurants
                      </NavLink>
                      <svg
                        className={`ml-2 w-4 h-4 transition-transform transform cursor-pointer ${
                          activeMenu === "about" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleMobileMenuClick("about")}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <AnimatePresence>
                      {activeMenu === "about" && (
                        <motion.ul
                          className="bg-white border border-gray-300 rounded-lg mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <li>
                            <NavLink
                              to="/category/Restaurants/TakeOut"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              TakeOut
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/category/Restaurants/Delivery"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Delivery
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/category/Restaurants/Reservation"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Reservation
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/Restaurants/Burgers"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Burgers
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/Restaurants/Thai"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Thai
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/Restaurants/Italian"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Italian
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/Restaurants/Reservations"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Reservations
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/Restaurants/Mexican"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Mexican
                            </NavLink>
                          </li>{" "}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>{" "}
                  <li className="relative">
                    <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 px-6 py-3">
                      <NavLink
                        to="/listing/Services"
                        className={({ isActive }) =>
                          isActive
                            ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                            : "block text-gray-700 hover:text-gray-900  pl-4"
                        }
                        onClick={toggleMobileMenu}
                      >
                        Services
                      </NavLink>
                      <svg
                        className={`ml-2 w-4 h-4 transition-transform transform cursor-pointer ${
                          activeMenu === "service" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleMobileMenuClick("service")}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <AnimatePresence>
                      {activeMenu === "service" && (
                        <motion.ul
                          className="bg-white border border-gray-300 rounded-lg mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <li>
                            <NavLink
                              to="/category/Services/Plumbing"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Plumbing
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/category/Services/Electrical"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Electrical
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/category/Services/Cleaning"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Cleaning
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/Services/Landscaping"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Landscaping
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/Services/Carpentry"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Carpentry
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/Services/Moving"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Moving
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/Services/Handyman"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Handyman
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/Services/Design"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Design
                            </NavLink>
                          </li>{" "}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>{" "}
                  <li className="relative">
                    <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 px-6 py-3">
                      <NavLink
                        to="/listing/AutoServices"
                        className={({ isActive }) =>
                          isActive
                            ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                            : "block text-gray-700 hover:text-gray-900  pl-4"
                        }
                        onClick={toggleMobileMenu}
                      >
                        Auto Services
                      </NavLink>
                      <svg
                        className={`ml-2 w-4 h-4 transition-transform transform cursor-pointer ${
                          activeMenu === "AutoServices" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleMobileMenuClick("AutoServices")}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <AnimatePresence>
                      {activeMenu === "AutoServices" && (
                        <motion.ul
                          className="bg-white border border-gray-300 rounded-lg mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <li>
                            <NavLink
                              to="/category/AutoServices/CarMaintenance"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Car Maintenance
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/category/AutoServices/TireChange"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Tire Change
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/category/AutoServices/EngineRepair"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Engine Repair
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/AutoServices/OilChange"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Oil Change
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/AutoServices/BrakeService"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Brake Service
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/AutoServices/Detailing"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Detailing
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/AutoServices/Inspection"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Inspection
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/AutoServices/EmergencyTowing"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Emergency Towing
                            </NavLink>
                          </li>{" "}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>{" "}
                  <li className="relative">
                    <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 px-6 py-3">
                      <NavLink
                        to="/listing/More"
                        className={({ isActive }) =>
                          isActive
                            ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                            : "block text-gray-700 hover:text-gray-900  pl-4"
                        }
                        onClick={toggleMobileMenu}
                      >
                        More{" "}
                      </NavLink>
                      <svg
                        className={`ml-2 w-4 h-4 transition-transform transform cursor-pointer ${
                          activeMenu === "More" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleMobileMenuClick("More")}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <AnimatePresence>
                      {activeMenu === "More" && (
                        <motion.ul
                          className="bg-white border border-gray-300 rounded-lg mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <li>
                            <NavLink
                              to="/category/More/DryCleaning"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Dry Cleaning
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/category/More/PhoneRepair"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Phone Repair
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/category/More/Cafes"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Cafes{" "}
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/More/OutdoorActivities"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Outdoor Activities{" "}
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/More/HairSalons"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Hair Salons{" "}
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/More/Gyms"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Gyms
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/More/Spas"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Spas
                            </NavLink>
                          </li>{" "}
                          <li>
                            <NavLink
                              to="/category/More/Shopping"
                              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 ml-4"
                              onClick={toggleMobileMenu}
                            >
                              Shopping{" "}
                            </NavLink>
                          </li>{" "}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>{" "}
                  <li className="px-6 py-3">
                    {isLoggedIn ? (
                      <>
                        <div className="flex items-center">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg0F0hqjo2pVSEgusU_JvJ4WOxd-U1QWMnw&usqp=CAU"
                            alt="name"
                            className="mr-4 rounded-full"
                            style={{ width: "40px", height: "40px" }}
                          />{" "}
                          <FaChevronDown
                            className="cursor-pointer"
                            onClick={toggleDropdown}
                          />
                        </div>
                        {isDropdownOpen && (
                          <div
                            ref={dropdownRef}
                            className="absolute mt-12 w-48 bg-white rounded-md shadow-lg py-2"
                          >
                            <Link to="/uprofile">
                              <div
                                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={handleProfileClick}
                              >
                                <FiUser className="mr-2" />
                                <span>Profile</span>
                              </div>
                            </Link>
                            <div
                              onClick={logout}
                              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              <FiLogOut className="mr-2" />{" "}
                              {/* Updated logout icon */}
                              <span>Logout</span>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center  md:block">
                          <button
                            onClick={openLogin}
                            className="bg-[#060640] hover:bg-[#060640] hover:opacity-80 text-white font-bold h-8 px-4 rounded-3xl mr-2"
                          >
                            LogIn
                          </button>
                        </div>
                        <Login
                          isOpen={isLoginOpen}
                          onClose={closeLogin}
                          onSignUpOpen={openSignUp}
                        />
                        <Signup
                          isOpen={isSignUpOpen}
                          onClose={closeSignUp}
                          onLoginOpen={openLogin}
                        />
                      </>
                    )}
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
