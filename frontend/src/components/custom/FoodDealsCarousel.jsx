// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const FoodDealsCarousel = () => {
//   const deals = [
//     { image: "/img1.png" },
//     { image: "/img2.png" },
//     { image: "/img3.png" },
//     { image: "/img4.png" } // Add more if needed
//   ];

//   const slidesToShow = Math.min(3, deals.length); // Max 3 slides
//   console.log(slidesToShow);

//   return (
//     <div className="flex justify-center mt-8">
//       <div className={`${slidesToShow === 3 ? "w-[1100px]" : "w-[700px]"}`}>
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={20} 
//           slidesPerView={Math.min(3, deals.length)} // Show up to 3 images, fallback to available count
//           breakpoints={{
//             768: { slidesPerView: Math.min(3, deals.length) }, // Show 3 on tablets
//             480: { slidesPerView: 1 } // Show 1 on smaller screens
//           }}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           loop={true}
//           className="rounded-lg"
//         >
//           {deals.map((deal, index) => (
//             <SwiperSlide key={index}>
//               <img
//                 src={deal.image}
//                 alt={`Deal ${index + 1}`}
//                 className="w-full h-auto object-cover rounded-lg"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default FoodDealsCarousel;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FoodDealsCarousel = () => {
  const deals = [
    { image: "/img1.png" },
    { image: "/img2.png" },
    { image: "/img3.png" },
    { image: "/img4.png" }
  ];

  return (
    <div className="flex justify-center mt-8 px-4">
      <div className="w-full max-w-[1100px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1} // Default to 1 slide on small screens
          breakpoints={{
            480: { slidesPerView: 1 }, // Small screens: 1 slide
            768: { slidesPerView: 2 }, // Tablets: 2 slides
            1024: { slidesPerView: Math.min(3, deals.length) } // Large screens: Up to 3 slides
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="rounded-lg"
        >
          {deals.map((deal, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={deal.image}
                alt={`Deal ${index + 1}`}
                className="w-full h-auto max-h-96 object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FoodDealsCarousel;
