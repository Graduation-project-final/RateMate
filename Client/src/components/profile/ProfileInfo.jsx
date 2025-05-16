import React from "react";

const ProfileInfo = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="text-center mb-8 bg-white rounded-lg shadow-sm p-6 relative">
      <div className="relative inline-block">
        <img
          src={profile.avatar || "./src/assets/images/ahmad.png"}
          alt={profile.name || "Profile Picture"}
          className="w-32 h-32 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
        />
      </div>
      <h1 className="text-2xl font-bold mb-1">{profile.name || "Name"}</h1>
      <p className="text-sm text-gray-600 mb-2">
        {profile.location || "Location"}
      </p>
      <div className="flex justify-center gap-4 text-sm text-gray-600 mb-3">
        <span title="Photos">📷 {profile.photos || "0"}</span>
        <span title="Reviews">✏️ {profile.reviews || "0"}</span>
        <span title="Friends">👥 {profile.friends || "0"}</span>
      </div>
      <button className="px-6 py-2 bg-[#060640] text-white text-sm font-semibold rounded-full hover:opacity-90 transition duration-300">
        Add friend
      </button>
    </div>
  );
};

export default ProfileInfo;
