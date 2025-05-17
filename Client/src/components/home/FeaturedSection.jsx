import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon, title, description, color, iconBg }) => {
  return (
    <div className="group relative p-6 overflow-hidden rounded-2xl transition-all duration-500 hover:transform hover:-translate-y-2 h-full">
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
      ></div>

      {/* Decorative circles */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white opacity-5"></div>
      <div className="absolute -right-5 -top-5 w-20 h-20 rounded-full bg-white opacity-5"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center h-full">
        <div
          className={`${iconBg} w-20 h-20 rounded-2xl p-4 mb-6 shadow-lg transform transition-transform duration-500 group-hover:rotate-6`}
        >
          {icon}
        </div>

        <h3 className={`text-2xl font-bold mb-4 ${color}`}>{title}</h3>

        <p className="text-gray-600 flex-grow">{description}</p>
      </div>
    </div>
  );
};

const FeaturedSection = () => {
  const features = [
    {
      title: "Customization",
      description:
        "Tailor our product to suit your needs Expand your reach with our global network.",
      color: "text-rose-500",
      bgColor: "bg-gradient-to-br from-rose-50 to-rose-100",
      iconBg: "bg-gradient-to-br from-rose-400 to-rose-600 text-white",
    },
    {
      title: "Security",
      description: "Your data is protected by the latest security measures.",
      color: "text-emerald-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
    },
    {
      title: "Support",
      description:
        "Tailor our product to suit your needs 24/7 customer support for all your inquiries.",
      color: "text-amber-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      iconBg: "bg-gradient-to-br from-amber-400 to-amber-600 text-white",
    },
    {
      title: "Performance",
      description: "Experience blazing-fast performance with our product.",
      color: "text-yellow-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      iconBg: "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white",
    },
    {
      title: "Global Reach",
      description:
        "Tailor our product to suit your needs Expand your reach with our global network.",
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
    },
    {
      title: "Communication",
      description:
        "Tailor our product to suit your needs Seamless communication for your team.",
      color: "text-gray-500",
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
      iconBg: "bg-gradient-to-br from-gray-400 to-gray-600 text-white",
    },
  ];

  // SVG Icons
  const icons = [
    // Customization
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 32 32"
    >
      <path
        d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM16 24a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7Z"
        data-original="#000000"
      />
    </svg>,

    // Security
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 682.667 682.667"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="40"
        transform="matrix(1.33 0 0 -1.33 0 682.667)"
      >
        <path
          d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z"
          data-original="#000000"
        />
        <path
          d="M178 271.894 233.894 216 334 316.105"
          data-original="#000000"
        />
      </g>
    </svg>,

    // Support
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 512.001 512.001"
    >
      <path
        d="M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 60v15c0 8.291 6.709 15 15 15h151c8.291 0 15-6.709 15-15v-15c0-23.134-9.016-44.041-23.408-60zM144.946 460.404 68.505 307.149c-7.381-14.799-25.345-20.834-40.162-13.493l-19.979 9.897c-7.439 3.689-10.466 12.73-6.753 20.156l90 180c3.701 7.423 12.704 10.377 20.083 6.738l19.722-9.771c14.875-7.368 20.938-25.417 13.53-40.272zM499.73 247.7c-12.301-9-29.401-7.2-39.6 3.9l-82 100.8c-5.7 6-16.5 9.6-22.2 9.6h-69.901c-8.401 0-15-6.599-15-15s6.599-15 15-15h60c16.5 0 30-13.5 30-30s-13.5-30-30-30h-78.6c-7.476 0-11.204-4.741-17.1-9.901-23.209-20.885-57.949-30.947-93.119-22.795-19.528 4.526-32.697 12.415-46.053 22.993l-.445-.361-21.696 19.094L174.28 452h171.749c28.2 0 55.201-13.5 72.001-36l87.999-126c9.9-13.201 7.2-32.399-6.299-42.3z"
        data-original="#000000"
      />
    </svg>,

    // Performance
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <g fillRule="evenodd" clipRule="evenodd">
        <path
          d="M17.03 8.97a.75.75 0 0 1 0 1.06l-4.2 4.2a.75.75 0 0 1-1.154-.114l-1.093-1.639L8.03 15.03a.75.75 0 0 1-1.06-1.06l3.2-3.2a.75.75 0 0 1 1.154.114l1.093 1.639L15.97 8.97a.75.75 0 0 1 1.06 0z"
          data-original="#000000"
        />
        <path
          d="M13.75 9.5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-1.25H14.5a.75.75 0 0 1-.75-.75z"
          data-original="#000000"
        />
        <path
          d="M3.095 3.095C4.429 1.76 6.426 1.25 9 1.25h6c2.574 0 4.57.51 5.905 1.845C22.24 4.429 22.75 6.426 22.75 9v6c0 2.574-.51 4.57-1.845 5.905C19.571 22.24 17.574 22.75 15 22.75H9c-2.574 0-4.57-.51-5.905-1.845C1.76 19.571 1.25 17.574 1.25 15V9c0-2.574.51-4.57 1.845-5.905zm1.06 1.06C3.24 5.071 2.75 6.574 2.75 9v6c0 2.426.49 3.93 1.405 4.845.916.915 2.419 1.405 4.845 1.405h6c2.426 0 3.93-.49 4.845-1.405.915-.916 1.405-2.419 1.405-4.845V9c0-2.426-.49-3.93-1.405-4.845C18.929 3.24 17.426 2.75 15 2.75H9c-2.426 0-3.93.49-4.845 1.405z"
          data-original="#000000"
        />
      </g>
    </svg>,

    // Global Reach
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 504.69 504.69"
    >
      <path
        d="M252.343 262.673c-49.32 0-89.447-40.127-89.447-89.447s40.127-89.447 89.447-89.447 89.447 40.127 89.447 89.447-40.121 89.447-89.447 89.447zm0-158.235c-37.926 0-68.787 30.861-68.787 68.787s30.861 68.787 68.787 68.787 68.787-30.861 68.787-68.787-30.855-68.787-68.787-68.787z"
        data-original="#000000"
      />
      <path
        d="M391.787 405.309c-5.645 0-10.253-4.54-10.325-10.201-.883-70.306-58.819-127.503-129.15-127.503-49.264 0-93.543 27.405-115.561 71.52-8.724 17.473-13.269 36.31-13.517 55.988-.072 5.702-4.757 10.273-10.459 10.201s-10.273-4.757-10.201-10.459c.289-22.814 5.568-44.667 15.691-64.955 25.541-51.164 76.907-82.95 134.047-82.95 81.581 0 148.788 66.349 149.81 147.905.072 5.702-4.494 10.392-10.201 10.459-.046-.005-.087-.005-.134-.005z"
        data-original="#000000"
      />
      <path
        d="M252.343 463.751c-116.569 0-211.408-94.834-211.408-211.408 0-116.569 94.839-211.408 211.408-211.408 116.574 0 211.408 94.839 211.408 211.408 0 116.574-94.834 211.408-211.408 211.408z"
        data-original="#000000"
      />
    </svg>,

    // Communication
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 682.667 682.667"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="30"
        transform="matrix(1.33 0 0 -1.33 0 682.667)"
      >
        <path
          d="M226 15v60c0 16.568-13.432 30-30 30H76c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45ZM466 15v60c0 16.568-13.432 30-30 30H316c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45Zm-75 167v-50.294L286 347h-60.002L166 296.706V347h-15c-41.421 0-75 33.579-75 75s33.579 75 75 75h210c41.421 0 75-33.579 75-75s-33.579-75-75-75Zm-105 75h30m-90 0h30m90 0h30"
          data-original="#000000"
        />
      </g>
    </svg>,
  ];

  return (
    <section className="py-20 overflow-hidden relative px-4 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#060640] mb-4 sm:mb-0">
            Our Features
          </h2>
          <Link
            to="/category/list"
            className="flex items-center text-[#060640] hover:text-[#FADED9] transition-colors"
          >
            <span className="font-medium mr-2">See all features</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div className="w-full border-b-2 border-[#FADED9] mb-12"></div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={icons[index]}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              iconBg={feature.iconBg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
