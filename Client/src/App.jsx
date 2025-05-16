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
      />{" "}
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

            {/* <Route path="/EC" element={<App2 />} /> */}
            {/* <Route path="/shop" element={<App3 />} /> */}
            {/* <Route path="/AboutUs" element={<AboutUs />} /> */}
            {/* <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/profile/:id" element={<ProfilePage user={user} />} /> */}
          </Routes>
        </main>
        {!hideNavbarFooter && <Footer />}
      </CartProvider>
    </div>
  );
};

export default App;
