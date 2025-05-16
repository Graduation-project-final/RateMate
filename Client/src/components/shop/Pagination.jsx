import React from "react";

function Pagination({ productsPerPage, totalProducts, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-8 flex justify-center">
      <ul className="flex list-none">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-2">
            <button
              onClick={() => paginate(number)} // Ensure paginate is called correctly
              className={`px-4 py-2 rounded-lg focus:outline-none ${
                currentPage === number ? "bg-red-700" : "bg-red-600"
              } text-white hover:bg-red-700`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
