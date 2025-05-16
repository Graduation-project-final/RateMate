import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import ProductDetails from "./details"; // Ensure correct import

const products = [
  {
    id: 1,
    name: "Elegant Mug",
    price: 18.0,
    discount: 25,
    rating: 5,
    image: "./src/assets/images/(1).png",
  },
  {
    id: 2,
    name: "Stylish Girly T-Shirt",
    price: 12.0,
    discount: 10,
    rating: 5,
    image: "./src/assets/images/(2).png",
  },
  {
    id: 3,
    name: "Trendy Girly T-Shirt",
    price: 10.0,
    discount: 50,
    rating: 5,
    image: "./src/assets/images/(3).png",
  },
  {
    id: 4,
    name: "Chic Women's T-Shirt",
    price: 15.0,
    discount: 20,
    rating: 4,
    image: "./src/assets/images/(4).png",
  },
  {
    id: 5,
    name: "Premium Women's T-Shirt",
    price: 18.0,
    discount: 15,
    rating: 5,
    image: "./src/assets/images/(5).png",
  },
  {
    id: 6,
    name: "Classic Men's T-Shirt",
    price: 14.0,
    discount: 30,
    rating: 4,
    image: "./src/assets/images/(6).png",
  },
  {
    id: 7,
    name: "Casual Boy's T-Shirt",
    price: 11.0,
    discount: 40,
    rating: 3,
    image: "./src/assets/images/(7).png",
  },
  {
    id: 8,
    name: "Comfortable Boy's T-Shirt",
    price: 16.0,
    discount: 10,
    rating: 5,
    image: "./src/assets/images/(8).png",
  },
  {
    id: 9,
    name: "Elegant Women's T-Shirt",
    price: 15.0,
    discount: 20,
    rating: 5,
    image: "./src/assets/images/(9).png",
  },
  {
    id: 10,
    name: "Versatile T-Shirt",
    price: 14.0,
    discount: 25,
    rating: 4,
    image: "./src/assets/images/(10).png",
  },
  {
    id: 11,
    name: "Premium T-Shirts",
    price: 17.0,
    discount: 15,
    rating: 5,
    image: "./src/assets/images/(11).png",
  },
  {
    id: 16,
    name: "Sophisticated Cup",
    price: 18.0,
    discount: 25,
    rating: 5,
    image: "./src/assets/images/(16).png",
  },
  {
    id: 17,
    name: "Small Elegant Mug",
    price: 16.0,
    discount: 20,
    rating: 4,
    image: "./src/assets/images/(17).png",
  },
  {
    id: 19,
    name: "Mug with Caps",
    price: 15.0,
    discount: 30,
    rating: 4,
    image: "./src/assets/images/(19).png",
  },
  {
    id: 20,
    name: "Cup with Caps",
    price: 17.0,
    discount: 15,
    rating: 5,
    image: "./src/assets/images/(20).png",
  },
  {
    id: 21,
    name: "Luxury Mug",
    price: 18.0,
    discount: 25,
    rating: 5,
    image: "./src/assets/images/(21).png",
  },
  {
    id: 22,
    name: "Deluxe Mug",
    price: 19.0,
    discount: 20,
    rating: 4,
    image: "./src/assets/images/(22).png",
  },
  {
    id: 23,
    name: "Classic Cup",
    price: 19.0,
    discount: 15,
    rating: 5,
    image: "./src/assets/images/(23).png",
  },
  {
    id: 24,
    name: "Refined Cup",
    price: 20.0,
    discount: 10,
    rating: 4,
    image: "./src/assets/images/(24).png",
  },
  {
    id: 25,
    name: "Premium Mobile Cover",
    price: 20.0,
    discount: 30,
    rating: 5,
    image: "./src/assets/images/(25).png",
  },
  {
    id: 26,
    name: "Exclusive Cover",
    price: 18.0,
    discount: 20,
    rating: 5,
    image: "./src/assets/images/(26).png",
  },
  {
    id: 27,
    name: "Stylish Button",
    price: 15.0,
    discount: 15,
    rating: 4,
    image: "./src/assets/images/(27).png",
  },
  {
    id: 28,
    name: "High-End Mug",
    price: 18.0,
    discount: 10,
    rating: 5,
    image: "./src/assets/images/(28).png",
  },
  {
    id: 29,
    name: "Medal of Honor",
    price: 19.0,
    discount: 25,
    rating: 4,
    image: "./src/assets/images/(29).png",
  },
  {
    id: 30,
    name: "Prestigious Medal",
    price: 20.0,
    discount: 20,
    rating: 5,
    image: "./src/assets/images/(30).png",
  },
  {
    id: 31,
    name: "Executive Bag",
    price: 19.0,
    discount: 15,
    rating: 4,
    image: "./src/assets/images/(31).png",
  },
  {
    id: 32,
    name: "Luxury Bag",
    price: 20.0,
    discount: 10,
    rating: 5,
    image: "./src/assets/images/(32).png",
  },
  {
    id: 33,
    name: "Deluxe Mug",
    price: 20.0,
    discount: 30,
    rating: 5,
    image: "./src/assets/images/(33).png",
  },
];

const productsPerPage = 6;

function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  useEffect(() => {
    // Load favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.some((fav) => fav.id === product.id)) {
        updatedFavorites = prevFavorites.filter((fav) => fav.id !== product.id);
      } else {
        updatedFavorites = [...prevFavorites, product];
      }
      // Save updated favorites to local storage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={handleProductClick}
            onToggleFavorite={() => toggleFavorite(product)}
            isFavorite={favorites.some((fav) => fav.id === product.id)}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={handleCloseDetails}
        />
      )}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      <div className="mt-8" id="section-id">
        <h2 className="text-2xl font-semibold mb-4">Favorite Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
              onToggleFavorite={() => toggleFavorite(product)}
              isFavorite={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
