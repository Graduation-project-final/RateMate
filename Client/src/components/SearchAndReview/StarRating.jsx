import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex items-center mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setRating(star)}
          className={`text-3xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </motion.button>
      ))}
    </div>
  );
};

export default StarRating;
