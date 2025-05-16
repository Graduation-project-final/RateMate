import React from "react";

const ProfileActions = () => {
  return (
    <div className="flex justify-between mb-8">
      {["Compliment", "Message", "Follow"].map((action) => (
        <button
          key={action}
          className="flex flex-col items-center text-xs group"
        >
          <span className="material-icons-outlined text-2xl mb-1 text-gray-600 group-hover:text-blue-500 transition duration-300">
            {action === "Compliment" ? "" : action === "Message" ? "" : ""}
          </span>
          {action}
        </button>
      ))}
    </div>
  );
};

export default ProfileActions;
