import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Category from "./pages/Category";
import ListingsPage from "./pages/listing";
import ReviewPage from "./pages/Review";
import ProfilePage from "./pages/profile";
import App3 from "./pages/shop";
import AboutUs from "./pages/EC-about";
import App2 from "./pages/EC";
import BlogPage from "./pages/Blog";
import PricingPage from "./pages/pricing";
import ProfilePage2 from "./pages/Uprofile";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import CategoryDetail from "./pages/CategoryDetail";
import ListingDetailCategory from "./pages/ListingDetailCategory";
import ListingDetail from "./pages/ListingDetail";
import RecommendationDetail from "./components/View/RecommendationDetail";
import VerifyEmailOTPPage from "./pages/VerifyEmailOTPPage";
import ForgotPassword from "./pages/ForgotPassword";
import Reply from "./pages/Reply";

import { CartProvider } from "./hooks/CartContext";
import SetNewPassword from "./pages/SetNewPassword";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";

// Beautiful Scroll to top button with stars
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button onClick={scrollToTop} className="fixed bottom-8 right-8 group">
        <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out">
          {/* Animated stars around the button */}
          <div className="absolute -top-1 -left-1 w-3 h-3 transform rotate-12 animate-pulse">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-yellow-300"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <div className="absolute -bottom-1 -right-1 w-2 h-2 transform -rotate-12 animate-pulse delay-300">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-yellow-200"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <div className="absolute -top-2 -right-2 w-2 h-2 transform rotate-45 animate-pulse delay-150">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          {/* Inner circle with gradient */}
          <div className="absolute inset-1 bg-gradient-to-br from-white to-yellow-50 rounded-full shadow-inner">
            {/* Arrow icon */}
            <div className="flex items-center justify-center h-full">
              <svg
                className="w-6 h-6 text-orange-600 transform group-hover:-translate-y-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </div>
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 animate-ping"></div>
        </div>

        {/* Floating text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs text-gray-600 font-medium whitespace-nowrap bg-white px-2 py-1 rounded shadow-md border">
            Back to Top ⭐
          </span>
        </div>
      </button>
    )
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const location = useLocation();
  const hideNavbarFooter =
    location.pathname === "/Login" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
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
      />
      <CartProvider>
        {!hideNavbarFooter && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Reply/:reviewId" element={<Reply />} />
            <Route path="/about" element={<About />} />
            <Route path="/Verify-email" element={<VerifyEmailPage />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/verify-otp/:email" element={<VerifyEmailOTPPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/list" element={<Category />} />
            <Route
              path="/category/:categoryName"
              element={<CategoryDetail />}
            />
            <Route
              path="/category/:categoryName/:subCategoryName"
              element={<CategoryDetail />}
            />
            <Route
              path="/category/:categoryName/:subCategoryName/:listingId"
              element={<ListingDetailCategory />}
            />
            <Route
              path="/category/:categoryName/:listingId"
              element={<ListingDetailCategory />}
            />
            <Route path="/listing/:category" element={<ListingsPage />} />
            <Route path="/listing/:category/:id" element={<ListingDetail />} />
            <Route
              path="/recommendations/:category/:id"
              element={<RecommendationDetail />}
            />
            <Route path="/review/:listingId" element={<ReviewPage />} />
            <Route path="/Uprofile" element={<ProfilePage2 />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/Login" element={<Login setUser={setUser} />} />
            <Route path="/PricingPage" element={<PricingPage />} />
            <Route path="/BlogPage" element={<BlogPage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />

            {/* <Route path="/EC" element={<App2 />} /> */}
            {/* <Route path="/shop" element={<App3 />} /> */}
            {/* <Route path="/AboutUs" element={<AboutUs />} /> */}
            {/* <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/profile/:id" element={<ProfilePage user={user} />} /> */}
          </Routes>
        </main>
        {!hideNavbarFooter && <Footer />}
        <ScrollToTopButton />
      </CartProvider>
    </div>
  );
};

export default App;
