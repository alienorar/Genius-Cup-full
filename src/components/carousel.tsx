import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Symbol from "../assets/symbol.png"
import OtuLogo from "../assets/otu-logo.png"

// Tashkilot ma'lumotlari
const data = [
  {
    organizer: "Qashqadaryo Viloyat hokimligi",
    website: "https://gov.uz/oz/qashqadaryo",
    logo:Symbol,
  },
  {
    organizer: "Osiyo texnologiyalar universiteti",
    website: "https://otu-edu.uz/",
    logo: OtuLogo,
  },
  {
    organizer: "Qashqadaryo Viloyat hokimligi",
    website: "https://gov.uz/oz/qashqadaryo",
    logo:Symbol,
  },
  {
    organizer: "Osiyo texnologiyalar universiteti",
    website: "https://otu-edu.uz/",
    logo: OtuLogo,
  },

];

const SwiperCarousel: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="mt-8 max-w-2xl mx-auto flex items-center justify-center">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          speed={1500}
          className="pb-10 smooth-transition"
          autoplay={{ delay: 1000, disableOnInteraction: true }}

       
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white w-[320px] min-h-[280px] flex flex-col justify-between p-6 shadow-lg text-center">
                {/* Logo */}
                <div className="flex justify-center items-center mb-4 gap-2 h-[80px]">
                 <a href={item.website}> <img
                    src={item.logo}
                    alt={item.organizer}
                    className="w-18 h-[80px] max-h-full object-contain"
                  /></a>
                </div>
                
                {/* Tashkilot nomi */}
                <h3 className="text-lg font-bold text-[#333] ">{item.organizer}</h3>

                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block w-full py-2 text-[#1E9FD9] font-bold border-2 border-[#1E9FD9] rounded-full overflow-hidden transition-all duration-300 group"
                >
                  <span className="absolute inset-0 bg-[#1E9FD9] scale-0 rounded-lg origin-center transition-transform duration-300 group-hover:scale-100"></span>
                  <span className="relative z-10 group-hover:text-white">Rasmiy Sahifamiz</span>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperCarousel;
