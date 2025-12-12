import React from "react";

const ImageCarousel = React.memo(() => (
  <div className="carousel-gsap relative w-full h-64 rounded-2xl overflow-hidden z-10 mt-4">
    <img
      src="/images/bureau.jpg"
      alt="Bureau Aria"
      className="carousel-image absolute inset-0 w-full h-full object-cover opacity-1"
    />
    <img
      src="/images/teamwork.jpg"
      alt="Travail d'équipe"
      className="carousel-image absolute inset-0 w-full h-full object-cover opacity-0"
    />
  </div>
));

ImageCarousel.displayName = "ImageCarousel";
export default ImageCarousel;
