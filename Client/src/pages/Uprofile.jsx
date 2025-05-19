import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import * as LucideIcons from "lucide-react";
import UserFavorite from "../components/otherComponents/UserFavorite";
import UserReview from "../components/otherComponents/UserReview";
import UserReplay from "../components/otherComponents/UserReplay";
import UserProduct from "../components/product/UserProduct";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");
  const [coverPhotoPreview, setCoverPhotoPreview] = useState("");
  const [isImageLoading, setIsImageLoading] = useState({
    profile: false,
    cover: false,
  });
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

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (profilePhotoPreview) {
        URL.revokeObjectURL(profilePhotoPreview);
      }
      if (coverPhotoPreview) {
        URL.revokeObjectURL(coverPhotoPreview);
      }
    };
  }, [profilePhotoPreview, coverPhotoPreview]);

  // Handle click outside modal
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

  // Fetch profile data
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
            : "/default-profile.png",
          coverPhoto: userProfile.coverPhoto
            ? `http://localhost:4000/${userProfile.coverPhoto}`
            : "/default-cover.jpg",
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
      if (profileData.profilePhoto instanceof File) {
        formData.append("profilePhoto", profileData.profilePhoto);
      }
      if (profileData.coverPhoto instanceof File) {
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

        // Clear previews after successful upload
        if (profilePhotoPreview) {
          URL.revokeObjectURL(profilePhotoPreview);
          setProfilePhotoPreview("");
        }
        if (coverPhotoPreview) {
          URL.revokeObjectURL(coverPhotoPreview);
          setCoverPhotoPreview("");
        }

        setProfileData({
          name: user.name,
          email: user.email,
          phone: userProfile.phoneNumber,
          dob: userProfile.dateOfBirth?.split("T")[0] || "",
          location: userProfile.location,
          occupation: userProfile.occupation,
          bio: userProfile.bio,
          profilePhoto: userProfile.profilePhoto
            ? `http://localhost:4000/${userProfile.profilePhoto}`
            : "/default-profile.png",
          coverPhoto: userProfile.coverPhoto
            ? `http://localhost:4000/${userProfile.coverPhoto}`
            : "/default-cover.jpg",
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
      files?.length > 0
    ) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);

      // Set loading state
      setIsImageLoading((prev) => ({
        ...prev,
        [name === "profilePhoto" ? "profile" : "cover"]: true,
      }));

      // Create preview
      if (name === "profilePhoto") {
        if (profilePhotoPreview) URL.revokeObjectURL(profilePhotoPreview);
        setProfilePhotoPreview(previewUrl);
      } else {
        if (coverPhotoPreview) URL.revokeObjectURL(coverPhotoPreview);
        setCoverPhotoPreview(previewUrl);
      }

      // Set the actual file in profileData
      setProfileData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      // When image loads, remove loading state
      const img = new Image();
      img.src = previewUrl;
      img.onload = () => {
        setIsImageLoading((prev) => ({
          ...prev,
          [name === "profilePhoto" ? "profile" : "cover"]: false,
        }));
      };
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0">
      <div className="p-2 bg-gray-50 rounded-full text-gray-600">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-gray-800">{value || "-"}</p>
      </div>
    </div>
  );

  if (!profileData.name) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="relative w-full h-full">
          <img
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoading.cover ? "opacity-50" : "opacity-100"
            }`}
            src={
              coverPhotoPreview ||
              profileData.coverPhoto ||
              "/default-cover.jpg"
            }
            // alt="Cover"
            onError={(e) => {
              e.target.src = "/default-cover.jpg";
            }}
          />
          {isImageLoading.cover && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative group">
              <div className="relative">
                <img
                  className={`w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white transition-opacity duration-300 ${
                    isImageLoading.profile ? "opacity-50" : "opacity-100"
                  }`}
                  src={
                    profilePhotoPreview ||
                    profileData.profilePhoto ||
                    "/default-profile.png"
                  }
                  // alt="Profile"
                  onError={(e) => {
                    e.target.src = "/default-profile.png";
                  }}
                />
                {isImageLoading.profile && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                )}
              </div>
              {isEditing && (
                <label
                  htmlFor="profilePhoto"
                  className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700 transition"
                >
                  <LucideIcons.Camera size={16} />
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    onChange={handleChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {profileData.name}
              </h1>
              <p className="text-gray-600">{profileData.occupation}</p>
              <div className="flex items-center space-x-2 text-gray-500">
                <LucideIcons.MapPin size={16} />
                <span>{profileData.location}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleEditClick}
            className="mt-4 md:mt-0 flex items-center space-x-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition border border-gray-200"
          >
            <LucideIcons.Edit2 size={16} />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("about")}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === "about"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === "products"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === "reviews"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === "favorites"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Favorites
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "about" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">About</h2>
              <p className="mt-2 text-gray-600">{profileData.bio}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-1">
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
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Professional Information
                </h3>
                <div className="space-y-1">
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
        )}

        {activeTab === "products" && <UserProduct />}
        {activeTab === "reviews" && <UserReview />}
        {activeTab === "favorites" && <UserFavorite />}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div
            ref={editModalRef}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit Profile
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <LucideIcons.X size={20} />
                </button>
              </div>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="occupation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Occupation
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={profileData.occupation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={profileData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="profilePhoto"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Profile Photo
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={
                          profilePhotoPreview ||
                          (profileData.profilePhoto &&
                          profileData.profilePhoto !== "/default-profile.png"
                            ? profileData.profilePhoto
                            : "/default-profile.png")
                        }
                        alt="Profile"
                        className={`w-24 h-24 rounded-full object-cover transition-opacity duration-300 ${
                          isImageLoading.profile ? "opacity-50" : "opacity-100"
                        }`}
                        onError={(e) => {
                          if (
                            e.target.src !==
                            window.location.origin + "/default-profile.png"
                          ) {
                            e.target.src = "/default-profile.png";
                          }
                        }}
                      />

                      {isImageLoading.profile && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="coverPhoto"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cover Photo
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={
                          coverPhotoPreview ||
                          (profileData.coverPhoto &&
                          profileData.coverPhoto !== "/default-cover.jpg"
                            ? profileData.coverPhoto
                            : "/default-cover.jpg")
                        }
                        alt="Cover"
                        className={`w-24 h-16 rounded-md object-cover transition-opacity duration-300 ${
                          isImageLoading.cover ? "opacity-50" : "opacity-100"
                        }`}
                        onError={(e) => {
                          if (
                            e.target.src !==
                            window.location.origin + "/default-cover.jpg"
                          ) {
                            e.target.src = "/default-cover.jpg";
                          }
                        }}
                      />

                      {isImageLoading.cover && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        id="coverPhoto"
                        name="coverPhoto"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {showAlert && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up">
            <LucideIcons.CheckCircle size={20} />
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
