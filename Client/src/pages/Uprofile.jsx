import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import * as LucideIcons from "lucide-react";
import UserFavorite from "../components/otherComponents/UserFavorite";
import UserReview from "../components/otherComponents/UserReview";
import UserReplay from "../components/otherComponents/UserReplay";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    location: "",
    occupation: "",
    bio: "",
    profilePhoto: "",
    coverPhoto: "",
  });
  const editModalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editModalRef.current &&
        !editModalRef.current.contains(event.target)
      ) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const user = response.data.user || {};
        const userProfile = response.data.profile || {};

        setProfileData({
          name: user.name || "",
          email: user.email || "",
          phone: userProfile.phoneNumber || "",
          dob: userProfile.dateOfBirth
            ? userProfile.dateOfBirth.split("T")[0]
            : "",
          location: userProfile.location || "",
          occupation: userProfile.occupation || "",
          bio: userProfile.bio || "",
          profilePhoto: userProfile.profilePhoto
            ? `http://localhost:4000/${userProfile.profilePhoto}`
            : "",
          coverPhoto: userProfile.coverPhoto
            ? `http://localhost:4000/${userProfile.coverPhoto}`
            : "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("phoneNumber", profileData.phone);
      formData.append("dateOfBirth", profileData.dob);
      formData.append("location", profileData.location);
      formData.append("occupation", profileData.occupation);
      formData.append("bio", profileData.bio);
      if (profileData.profilePhoto) {
        formData.append("profilePhoto", profileData.profilePhoto);
      }
      if (profileData.coverPhoto) {
        formData.append("coverPhoto", profileData.coverPhoto);
      }

      const response = await axios.put(
        "http://localhost:4000/api/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Profile updated successfully");

        // Fetch the updated profile data
        const updatedProfileResponse = await axios.get(
          "http://localhost:4000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const user = updatedProfileResponse.data.user || {};
        const userProfile = updatedProfileResponse.data.profile || {};

        setProfileData({
          name: user.name,
          email: user.email,
          phone: userProfile.phoneNumber,
          dob: userProfile.dateOfBirth.split("T")[0],
          location: userProfile.location,
          occupation: userProfile.occupation,
          bio: userProfile.bio,
          profilePhoto: `http://localhost:4000/${userProfile.profilePhoto}`,
          coverPhoto: `http://localhost:4000/${userProfile.coverPhoto}`,
        });
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (
      (name === "profilePhoto" || name === "coverPhoto") &&
      files.length > 0
    ) {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-2 text-gray-600">
      <Icon size={16} />
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-screen-xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="relative h-80">
          <img
            className="w-full h-full object-cover"
            src={profileData.coverPhoto}
            alt="Cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <button
            className="absolute top-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-100 transition flex items-center space-x-2"
            onClick={handleEditClick}
          >
            <LucideIcons.Edit2 size={16} />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="relative px-6 py-10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg -mt-20 mx-auto md:mx-0"
                src={profileData.profilePhoto}
                alt="Profile"
              />
            </div>
            <div className="md:w-2/3 mt-6 md:mt-0">
              <h2 className="text-4xl font-bold text-gray-800">
                {profileData?.name}
              </h2>
              <p className="mt-2 text-gray-600">{profileData.bio}</p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-800 text-2xl font-semibold mb-4 flex items-center">
              <LucideIcons.User className="mr-2" /> About
            </h3>
            <div className="space-y-3">
              <InfoItem
                icon={LucideIcons.Mail}
                label="Email"
                value={profileData.email}
              />
              <InfoItem
                icon={LucideIcons.Phone}
                label="Phone"
                value={profileData.phone}
              />
              <InfoItem
                icon={LucideIcons.Calendar}
                label="Date of Birth"
                value={profileData.dob}
              />
              <InfoItem
                icon={LucideIcons.MapPin}
                label="Location"
                value={profileData.location}
              />
              <InfoItem
                icon={LucideIcons.Briefcase}
                label="Occupation"
                value={profileData.occupation}
              />
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={editModalRef}
            className="bg-white p-6 rounded-lg max-w-lg mx-auto max-h-[90%] overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={profileData.dob}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium"
                >
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={profileData.occupation}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="profilePhoto"
                  className="block text-sm font-medium"
                >
                  Profile Photo
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  onChange={handleChange}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="coverPhoto"
                  className="block text-sm font-medium"
                >
                  Cover Photo
                </label>
                <input
                  type="file"
                  id="coverPhoto"
                  name="coverPhoto"
                  onChange={handleChange}
                  className="w-full mt-1"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-md">
          Profile updated successfully!
        </div>
      )}

      <UserFavorite />
      <UserReview />
      <UserReplay />
    </div>
  );
};

export default ProfilePage;
