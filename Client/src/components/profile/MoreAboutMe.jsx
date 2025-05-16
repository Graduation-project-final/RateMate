import React from "react";

const MoreAboutMe = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">More about me</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h3 className="font-semibold mb-1">Location</h3>
          <p>Amman, Jordan</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Reviewing since</h3>
          <p>March 2015</p>
        </div>
      </div>
    </div>
  );
};

export default MoreAboutMe;
