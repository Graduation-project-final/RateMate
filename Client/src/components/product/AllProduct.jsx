import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ShoppingBag,
  Calendar,
  Tag,
  CheckCircle,
  Loader2,
  X,
  ChevronDown,
  Grid3X3,
  List,
  ImagePlus,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Electronics",
  "Smartphones",
  "Laptops",
  "Cameras",
  "Accessories",
  "Clothing",
];

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (!product.id) {
      console.error("Product ID missing, cannot navigate");
      return;
    }
    navigate(`/productDetails/${product.id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Product Image with Status Badge */}
      <div className="relative">
        {product.mainImage ? (
          <img
            src={`http://localhost:4000/${product.mainImage}`}
            alt={product.title}
            className="w-full h-56 object-cover"
          />
        ) : (
          <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
            <ImagePlus size={48} className="text-gray-300" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
            <CheckCircle size={12} className="mr-1" />
            {product.status}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Category */}
        <div className="flex items-center mb-2">
          <Tag size={14} className="text-gray-400 mr-1" />
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* View More Button */}
        <button
          onClick={handleViewDetails}
          className="mt-auto flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <span>View Details</span>
          <ArrowRight size={16} className="ml-1" />
        </button>

        {/* Created Date */}
        <div className="flex items-center mt-2 text-xs text-gray-400">
          <Calendar size={12} className="mr-1" />
          {new Date(product.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Sub Images Preview */}
      {product.subImages && product.subImages.length > 0 && (
        <div className="px-5 pb-4 border-t border-gray-100 pt-2">
          <div className="flex gap-2 overflow-x-auto py-1">
            {product.subImages.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:4000/${img}`}
                alt={`${product.title} subimage ${idx + 1}`}
                className="w-12 h-12 object-cover rounded-md flex-shrink-0"
              />
            ))}
            {product.subImages.length > 4 && (
              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-gray-500 font-medium">
                  +{product.subImages.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Custom navy color from the provided code
  const navyColor = "#060640";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products/approved");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtering logic
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (categoryFilter !== "All" && product.category !== categoryFilter) {
        return false;
      }
      return true;
    })
    .filter((product) => {
      // Search filter on title and description, case insensitive
      const lowerSearch = searchTerm.toLowerCase();
      return (
        product.title.toLowerCase().includes(lowerSearch) ||
        product.description.toLowerCase().includes(lowerSearch)
      );
    });

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Clear search handler
  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1); // Reset to first page when clearing search
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <Loader2
          size={32}
          className="animate-spin mb-4"
          style={{ color: navyColor }}
        />
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <X size={32} className="text-red-500 mb-4" />
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3" style={{ color: navyColor }}>
          Products
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 pl-10 pr-10 py-2.5 w-full"
              style={{
                focusRing: navyColor,
                borderColor: searchTerm ? navyColor : "inherit",
              }}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={handleClearSearch}
              >
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative min-w-[180px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 pl-10 pr-10 py-2.5 w-full appearance-none cursor-pointer"
              style={{
                focusRing: navyColor,
                borderColor: categoryFilter !== "All" ? navyColor : "inherit",
              }}
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1); // Reset to first page when changing category
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              className={`p-2 ${
                viewMode === "grid" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3
                size={18}
                className={
                  viewMode === "grid" ? "text-gray-800" : "text-gray-400"
                }
              />
            </button>
            <button
              className={`p-2 ${
                viewMode === "list" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List
                size={18}
                className={
                  viewMode === "list" ? "text-gray-800" : "text-gray-400"
                }
              />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-500 flex items-center">
          <ShoppingBag size={14} className="mr-1" />
          <span>
            Showing {currentProducts.length} of {filteredProducts.length}{" "}
            products (Page {currentPage} of {totalPages})
          </span>
        </div>
      </div>

      {/* Products */}
      {currentProducts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <X size={24} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No Products Found</h3>
          <p className="text-gray-500 mb-6">
            We couldn't find any products matching your criteria.
          </p>
          <button
            className="px-5 py-2 rounded-lg text-white"
            style={{ backgroundColor: navyColor }}
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("All");
              setCurrentPage(1);
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {number}
                </button>
              )
            )}

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
