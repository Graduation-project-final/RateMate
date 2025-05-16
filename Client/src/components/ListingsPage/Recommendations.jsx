import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Recommendations = () => {
  const { category } = useParams();
  const [randomServices, setRandomServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/random/${category}`
        );
        setRandomServices(response.data);
      } catch (error) {
        console.error("Error fetching random services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomServices();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-32">
      <h3 className="text-2xl font-semibold text-[#2c3e50] mb-6 text-center">
        Recommended for you
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {randomServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg border border-gray-300 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <img
              src={`http://localhost:4000/${service.mainImage}`}
              alt={service.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h4>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <Link
                  to={`/category/${service.category}/${service.subcategory}/${service.id}`}
                  className="text-[#060640] hover:underline font-semibold"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
