import React, { useState } from "react";
import {
  Camera,
  Link,
  FileText,
  Box,
  Upload,
  Loader,
  Tag,
  ChevronDown,
} from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    productUrl: "",
    mainImage: null,
    subImages: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "Electronics",
    "Smartphones",
    "Laptops",
    "Cameras",
    "Accessories",
    "Clothing",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "subImages") {
      setFormData({
        ...formData,
        [name]: Array.from(files),
      });
    } else {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("productUrl", formData.productUrl);
      if (formData.mainImage) {
        data.append("mainImage", formData.mainImage);
      }

      formData.subImages.forEach((image) => {
        data.append(`subImages`, image);
      });

      const response = await fetch(
        "http://localhost:4000/api/products-create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        if (
          responseData.message.includes("You can only create up to 2 products")
        ) {
          const result = await Swal.fire({
            title: "Product Limit Reached",
            text: "You've reached your product limit (2 products). Upgrade to a Business Account to add unlimited products.",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Upgrade Now",
            cancelButtonText: "Maybe Later",
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#6b7280",
            background: "#ffffff",
          });

          if (result.isConfirmed) {
            navigate("/PricingPage");
          }
          return;
        }
        throw new Error(responseData.message || "Failed to create product");
      }

      await Swal.fire({
        title: "Success!",
        text: "Product created successfully!",
        icon: "success",
        confirmButtonColor: "#4f46e5",
        background: "#ffffff",
      });

      // Reset form
      setFormData({
        title: "",
        category: "",
        description: "",
        productUrl: "",
        mainImage: null,
        subImages: [],
      });
    } catch (err) {
      console.error("API Error:", err);
      if (!err.message.includes("You can only create up to 2 products")) {
        await Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonColor: "#4f46e5",
          background: "#ffffff",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Add New Product
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Fill in the details below to list your product
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6 p-8">
            {/* Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="flex items-center">
                  <Box className="h-5 w-5 text-indigo-600 mr-2" />
                  Product Title
                </div>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product title"
              />
            </div>

            {/* Category */}
            <div className="space-y-2 relative">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-indigo-600 mr-2" />
                  Category
                </div>
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white pr-10"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                  Description
                </div>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe your product in detail"
              />
            </div>

            {/* Product URL */}
            <div className="space-y-2">
              <label
                htmlFor="productUrl"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="flex items-center">
                  <Link className="h-5 w-5 text-indigo-600 mr-2" />
                  Product URL
                </div>
              </label>
              <input
                type="url"
                id="productUrl"
                name="productUrl"
                value={formData.productUrl}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/product"
              />
            </div>

            {/* Main Image */}
            <div className="space-y-2">
              <label
                htmlFor="mainImage"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="flex items-center">
                  <Camera className="h-5 w-5 text-indigo-600 mr-2" />
                  Main Image
                </div>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="mainImage"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="mainImage"
                        name="mainImage"
                        type="file"
                        onChange={handleFileChange}
                        required
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {formData.mainImage && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected: {formData.mainImage.name}
                </p>
              )}
            </div>

            {/* Sub Images */}
            <div className="space-y-2">
              <label
                htmlFor="subImages"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="flex items-center">
                  <Upload className="h-5 w-5 text-indigo-600 mr-2" />
                  Additional Images
                </div>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="subImages"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload files</span>
                      <input
                        id="subImages"
                        name="subImages"
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>
              {formData.subImages.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected: {formData.subImages.length} files
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Processing...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
