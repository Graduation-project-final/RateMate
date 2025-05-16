import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/CartContext";

const HeaderSection = () => {
  const { cartItems, totalAmount } = useCart();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartVisible(false);
    }
  };

  useEffect(() => {
    if (isCartVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartVisible]);

  return (
    <header className="sticky top-[100px] bg-white p-4 shadow-md z-50">
      <nav className="flex justify-between items-center container mx-auto relative">
        <div className="flex items-center space-x-2">
          <div className="h-8"></div>
          <div className="text-[#060640] font-bold text-2xl">RateMateSHOP</div>
        </div>
        <div className="space-x-4">
          <Link
            to="/EC"
            className="text-gray-600 hover:text-[#060640] transition-colors"
          >
            Center
          </Link>
          <Link
            to="/shop"
            className="text-gray-600 hover:text-[#060640] transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/AboutUs"
            className="text-gray-600 hover:text-[#060640] transition-colors"
          >
            Our Story
          </Link>
          <Link
            to="/shop#section-id"
            className="text-gray-600 hover:text-[#060640] transition-colors"
          >
            Favorites
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-600 hover:text-red-500 transition-colors"
            onClick={toggleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {isSearchVisible && (
            <div
              className={`${
                isSearchVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              } transition-all duration-300 transform ease-in-out p-2 border rounded-md shadow-lg bg-white`}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 border rounded-md shadow-sm"
              />
            </div>
          )}
          <div className="pr-4">
            <button
              className="text-gray-600 relative hover:text-red-500 transition-colors"
              onClick={toggleCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            </button>
          </div>
          {isCartVisible && (
            <div
              ref={cartRef}
              className={`${
                isCartVisible
                  ? `opacity-100 scale-100 ${
                      cartItems.length === 0 ? "mt-64" : "mt-[27rem]"
                    }`
                  : "opacity-0 scale-90 "
              } transition-all duration-300 transform ease-in-out absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-xl p-4 z-50`}
            >
              <h3 className="text-lg font-semibold mb-3 border-b pb-2">
                Cart Summary
              </h3>
              <div className="overflow-y-auto max-h-60">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between space-x-2 border-b pb-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex flex-col flex-grow">
                        <span className="font-medium text-sm">{item.name}</span>
                        <span className="text-gray-500 text-xs">
                          Price: ${item.price}
                        </span>
                        <span className="text-gray-500 text-xs">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-gray-500 text-xs">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                <div className="flex justify-between border-t pt-2 font-bold text-lg">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                View Cart
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderSection;
