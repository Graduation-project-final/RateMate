import React, { useState } from "react";
import Modal from "./Modal";
import ProfileOverview from "./profilTabsComponents/ProfileOverview";
import Reviews from "./profilTabsComponents/Reviews";
import PhotosAndVideos from "./profilTabsComponents/PhotosAndVideos";
import Collections from "./profilTabsComponents/Collections";
import Compliments from "./profilTabsComponents/Compliments";
import Friends from "./profilTabsComponents/Friends";
import ReportProfile from "./profilTabsComponents/ReportProfile";

const ProfileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: null });

  const components = {
    "Profile overview": <ProfileOverview />,
    Reviews: <Reviews />,
    "Photos and videos": <PhotosAndVideos />,
    Collections: <Collections />,
    Compliments: <Compliments />,
    Friends: <Friends />,
    "Report this profile": <ReportProfile />,
  };

  const handleClick = (item) => {
    setModalContent({
      title: item,
      body: components[item],
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setModalContent({ title: "", body: null });
  };

  return (
    <>
      <nav className="space-y-1 text-sm bg-white rounded-lg shadow-sm overflow-hidden">
        {Object.keys(components).map((item) => (
          <div
            key={item}
            className="p-3 hover:bg-gray-50 cursor-pointer transition duration-300"
            onClick={() => handleClick(item)}
          >
            {item}
          </div>
        ))}
        <div
          className="text-red-500 p-3 cursor-pointer text-xs hover:bg-red-50 transition duration-300"
          onClick={() => handleClick("Report this profile")}
        >
          Report this profile
        </div>
      </nav>
      <Modal isOpen={isOpen} onClose={handleClose} content={modalContent} />
    </>
  );
};

export default ProfileNav;
