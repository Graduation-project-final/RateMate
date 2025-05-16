import React from "react";
import { useParams } from "react-router-dom";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileNav from "../components/profile/ProfileNav";
import Impact from "../components/profile/Impact";
import ReviewDistribution from "../components/profile/ReviewDistribution";
import MoreAboutMe from "../components/profile/MoreAboutMe";
import Reviews from "../components/profile/Reviews";

// Static data for example; replace with actual data fetching logic
const allProfiles = [
  {
    id: "1",
    name: "Islam",
    location: "Amman, Jordan",
    avatar:
      "https://img.freepik.com/premium-vector/default-user-profile-vector-illustration_664995-334.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    photos: 215,
    reviews: 89,
    friends: 132,
    reviewsData: [
      {
        id: "1",
        restaurantName: "Hashem Restaurant",
        cuisine: "Middle Eastern, Jordanian, Vegetarian Friendly",
        rating: 5,
        date: "7/15/2023",
        comment:
          "Authentic Jordanian cuisine in the heart of downtown Amman. Their falafel and hummus are simply unbeatable...",
      },
      {
        id: "2",
        restaurantName: "Nafisa Restaurant",
        cuisine: "Mediterranean, Vegan Friendly",
        rating: 4,
        date: "8/10/2023",
        comment:
          "Great place for Mediterranean food. The atmosphere is cozy, and the service is good.",
      },
      {
        id: "3",
        restaurantName: "The Jordanian Grill",
        cuisine: "Grill, BBQ",
        rating: 3,
        date: "9/05/2023",
        comment:
          "The food was decent, but the noise level was too high. Could be better.",
      },
    ],
  },
  {
    id: "2",
    name: "Omar",
    location: "Cairo, Egypt",
    avatar:
      "https://img.freepik.com/premium-vector/default-user-profile-vector-illustration_664995-334.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    photos: 150,
    reviews: 75,
    friends: 95,
    reviewsData: [
      {
        id: "1",
        restaurantName: "Cairo Bistro",
        cuisine: "Egyptian, Mediterranean",
        rating: 4,
        date: "6/20/2023",
        comment:
          "A fantastic spot for Egyptian dishes. The koshari was delicious, and the service was attentive.",
      },
      {
        id: "2",
        restaurantName: "Nile Grill",
        cuisine: "Grill, BBQ",
        rating: 5,
        date: "7/25/2023",
        comment:
          "Excellent grilled meats and a vibrant atmosphere. Highly recommended.",
      },
      {
        id: "3",
        restaurantName: "Sphinx Cafe",
        cuisine: "Cafe, Dessert",
        rating: 3,
        date: "8/15/2023",
        comment:
          "Nice place for a coffee and dessert. However, it was a bit overpriced.",
      },
    ],
  },
  {
    id: "3",
    name: "Farooq",
    location: "Dubai, UAE",
    avatar:
      "https://img.freepik.com/premium-vector/default-user-profile-vector-illustration_664995-334.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    photos: 180,
    reviews: 100,
    friends: 110,
    reviewsData: [
      {
        id: "1",
        restaurantName: "Dubai Delights",
        cuisine: "Middle Eastern, Emirati",
        rating: 5,
        date: "5/30/2023",
        comment:
          "Amazing Emirati cuisine with a great view of the city. A must-visit place in Dubai.",
      },
      {
        id: "2",
        restaurantName: "Spice Market",
        cuisine: "Asian, Fusion",
        rating: 4,
        date: "6/25/2023",
        comment:
          "The spice-infused dishes were fantastic. The ambiance is also very appealing.",
      },
      {
        id: "3",
        restaurantName: "The Dubai Grill",
        cuisine: "Grill, BBQ",
        rating: 3,
        date: "7/20/2023",
        comment:
          "Good grill but the service was a bit slow. Could be improved.",
      },
      {
        id: "11",
        restaurantName: "The Dubai Grill",
        cuisine: "Grill, BBQ",
        rating: 3,
        date: "7/20/2023",
        comment:
          "Good grill but the service was a bit slow. Could be improved.",
      },
    ],
  },
  // Add more profiles with reviewsData as needed
];

const ProfilePage = () => {
  const { id } = useParams();

  // Find the profile based on the ID
  const profile = allProfiles.find((profile) => profile.id === id);

  if (!profile) {
    return <div>Profile not found</div>; // Handle the case where the profile is not found
  }

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans bg-gray-100 rounded-xl">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-1/3">
          <ProfileInfo profile={profile} />
          <ProfileNav />
        </div>
        <div className="w-full lg:w-2/3">
          <Impact profile={profile} />
          <ReviewDistribution profile={profile} />
          <MoreAboutMe profile={profile} />
          <Reviews reviews={profile.reviewsData} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
