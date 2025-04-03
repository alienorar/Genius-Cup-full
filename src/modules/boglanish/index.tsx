import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import SupportService from "../../assets/support-service.png"
import Instagram from "../../assets/instagram (2) 1.svg"
import Telegram from "../../assets/telegram (4) 1.svg"
import Twitter from "../../assets/twitter 1.svg"
import Youtube from "../../assets/youtube (1) 1.svg"
import { motion } from "framer-motion";
const ContactSection = () => {
  return (
    <>
      <section className=" custom-container">
        <motion.div 
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col-reverse md:flex-row items-center gap-5 lg:gap-40 lg:px-[100px]  py-[10px]">
          {/* Left Content */}
          <div className="flex flex-col md:items-start items-center  poppin">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-semibold text-gray-800 poppin text-center md:text-start">Biz bilan bog‘lanish</h2>
              <p className="text-[#01284099] text-center md:text-start text-[14px] md:text-[16px] poppin">
              "Genius Cup" intellektual musobaqasi orqali aql-zakovatingizni sinang! Bu platforma sizga mantiqiy fikrlash, muammolarni hal qilish va strategik tahlil qilish qobiliyatlaringizni oshirish imkoniyatini taqdim etadi..
              </p>
            </div>
            {/* Social Media Links */}
            <div className="grid grid-cols-2 gap-4 items-center  justify-center max-w-xs mt-6">
              <a href="https://www.instagram.com/asianuniversity_edu/" className="flex items-center space-x-2  text-gray-700 hover:text-pink-500">
                <img src={Instagram} alt="instagram" />
                <span className="poppin">Instagram</span>
              </a>
              <a href="https://www.youtube.com/@asianuniversity_edu" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
                <img src={Youtube} alt="you tube" />
                <span className="poppin">YouTube</span>
              </a>
              <a href="https://t.me/asianuniversity_edu" className="flex items-center space-x-2 text-gray-700 hover:text-[#1E9FD9]">
                <img src={Telegram} alt="telegram" />
                <span className="poppin">Telegram</span>
              </a>
              <a href="https://x.com/atu_uz" className="flex items-center space-x-2 text-gray-700 hover:text-black">
                <img src={Twitter} alt="twitter" />
                <span className="poppin">Twitter</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={SupportService}
              alt="Customer Support"
              className="md:max-w-xl  "
            />
          </div>
        </motion.div>
      </section>
      <section className="relative w-full px-6 md:px-16 py-12  custom-container">
        {/* Contact Info Box */}
        <div className="absolute top-55 sm:top-55 md:top-30 lg:top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-[-2px_-2px_75px_4px_rgba(0,_0,_0,_0.1)] p-6 md:p-8 flex flex-col  md:flex-row items-center justify-between w-11/12 md:w-3/4 lg:w-2/3">
          {/* Location */}
          <div className="flex flex-col items-center text-center w-[240px] px-4">
            <FaMapMarkerAlt className="text-[#1E9FD9] text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Location</h3>
            <p className="text-gray-600 text-sm">
            Qashqadaryo viloyati, Qarshi tuman, Chaman MFY, Mustaqillik ko’chasi, 41-uy.
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center px-4 mt-6 md:mt-0">
            <FaEnvelope className="text-[#1E9FD9] text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Email Address</h3>
            <a href="mailto:Info@asianuniversity.uz" className="text-gray-600 text-sm">Info@asianuniversity.uz</a>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center text-center px-4 mt-6 md:mt-0">
            <FaPhoneAlt className="text-[#1E9FD9] text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Phone Number</h3>
            <a href="tel:+998901231166" className="text-gray-600 text-sm">+998(90)1231166</a>
          </div>
        </div>
        {/* Map */}
        <div className="mt-44 lg:mt-24">
          <iframe
            className="w-full h-96  shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.845263204625!2d69.2400733!3d41.2994959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a2bf0fdc6eb%3A0x1640fef4c2c0d2d0!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1633531912056!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </>

  );
};

export default ContactSection;
