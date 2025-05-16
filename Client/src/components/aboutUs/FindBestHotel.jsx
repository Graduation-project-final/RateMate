const FindBestPlaces = () => {
  return (
    <div className="relative bg-img-FindBestHotel bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
      {/* Overlay with adjusted opacity */}
      <div className="relative z-10 text-center px-6 md:px-12 lg:px-24">
        <div className="text-white">
          <span className="block text-xl md:text-2xl font-semibold mb-4">
            FIND BEST PLACES FOR VISITING
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Find <div className="text-[#FADED9]">TOP RATED</div> places in{" "}
            <br />
            Jordan
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FindBestPlaces;
