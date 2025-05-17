const FindBestPlaces = () => {
  return (
    <section className="relative bg-img-FindBestHotel bg-cover bg-center min-h-screen flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 sm:px-12 text-center">
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-lg border border-white/20">
          <h2 className="text-[#FADED9] text-lg sm:text-xl font-semibold mb-3 tracking-wider">
            YOUR JOURNEY STARTS HERE
          </h2>
          <h1 className="text-white text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
            Explore Jordan’s <span className="text-[#FADED9]">Top-Rated</span>{" "}
            Experiences
          </h1>
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
            At RateMate, we go beyond simple reviews. Our community-driven
            platform helps you discover the most loved places — from hidden gems
            to well-known hotspots — all rated by real users who’ve been there.
            Whether you're planning your next adventure or looking for the best
            local services, RateMate makes the decision easier.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FindBestPlaces;
