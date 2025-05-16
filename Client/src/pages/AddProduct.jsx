import React, { useState } from "react";
import { Camera, Link, FileText, Box, Upload, Loader, Tag } from "lucide-react";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    productUrl: "",
    mainImage: null,
    subImages: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      data.append("mainImage", formData.mainImage);

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      Swal.fire({
        title: "Success!",
        text: "Product created successfully!",
        icon: "success",
        confirmButtonColor: "#060640",
        background: "#ffffff",
      });

      setFormData({
        title: "",
        category: "",
        description: "",
        productUrl: "",
        mainImage: null,
        subImages: [],
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#060640",
        background: "#ffffff",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg bg-white border-2">
      <h1
        className="text-3xl font-bold mb-8 text-center"
        style={{ color: "#060640" }}
      >
        Add New Product
      </h1>

      <div onSubmit={handleSubmit} className="space-y-6">
        <div
          className="bg-white p-6 rounded-lg shadow-sm border"
          style={{ borderColor: "#060640" }}
        >
          <div className="flex items-center mb-2">
            <Box size={20} className="mr-2" style={{ color: "#060640" }} />
            <label
              htmlFor="title"
              className="text-sm font-medium"
              style={{ color: "#060640" }}
            >
              Title
            </label>
          </div>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: "#060640", focusRingColor: "#060640" }}
          />
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-sm border"
          style={{ borderColor: "#060640" }}
        >
          <div className="flex items-center mb-2">
            <Tag size={20} className="mr-2" style={{ color: "#060640" }} />
            <label
              htmlFor="category"
              className="text-sm font-medium"
              style={{ color: "#060640" }}
            >
              Category
            </label>
          </div>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: "#060640", focusRingColor: "#060640" }}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-sm border"
          style={{ borderColor: "#060640" }}
        >
          <div className="flex items-center mb-2">
            <FileText size={20} className="mr-2" style={{ color: "#060640" }} />
            <label
              htmlFor="description"
              className="text-sm font-medium"
              style={{ color: "#060640" }}
            >
              Description
            </label>
          </div>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: "#060640", focusRingColor: "#060640" }}
          />
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-sm border"
          style={{ borderColor: "#060640" }}
        >
          <div className="flex items-center mb-2">
            <Link size={20} className="mr-2" style={{ color: "#060640" }} />
            <label
              htmlFor="productUrl"
              className="text-sm font-medium"
              style={{ color: "#060640" }}
            >
              Product URL
            </label>
          </div>
          <input
            type="url"
            id="productUrl"
            name="productUrl"
            value={formData.productUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
            style={{ borderColor: "#060640", focusRingColor: "#060640" }}
          />
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-sm border"
          style={{ borderColor: "#060640" }}
        >
          <div className="flex items-center mb-2">
            <Camera size={20} className="mr-2" style={{ color: "#060640" }} />
            <label
              htmlFor="mainImage"
              className="text-sm font-medium"
              style={{ color: "#060640" }}
            >
              Main Image
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="file"
              id="mainImage"
              name="mainImage"
              onChange={handleFileChange}
              required
              accept="image/*"
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:text-white file:bg-indigo-600"
              style={{ color: "#060640", fileBackgroundColor: "#060640" }}
            />
          </div>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-sm border"
          style={{ borderColor: "#060640" }}
        >
          <div className="flex items-center mb-2">
            <Upload size={20} className="mr-2" style={{ color: "#060640" }} />
            <label
              htmlFor="subImages"
              className="text-sm font-medium"
              style={{ color: "#060640" }}
            >
              Sub Images (Multiple)
            </label>
          </div>
          <input
            type="file"
            id="subImages"
            name="subImages"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:text-white file:bg-indigo-600"
            style={{ color: "#060640", fileBackgroundColor: "#060640" }}
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-3 px-4 rounded-md text-base font-medium text-white"
            style={{ backgroundColor: "#060640" }}
          >
            {isSubmitting ? (
              <>
                <Loader size={20} className="animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
