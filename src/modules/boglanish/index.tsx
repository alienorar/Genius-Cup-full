import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import SupportService from "../../assets/support-service.png"
import Instagram from "../../assets/instagram (2) 1.svg"
import Telegram from "../../assets/telegram (4) 1.svg"
import Twitter from "../../assets/twitter 1.svg"
import Youtube from "../../assets/youtube (1) 1.svg"

const ContactSection = () => {
  return (
    <>
      <section className=" custom-container">
      <div className="flex flex-col-reverse md:flex-row items-center gap-40 px-[100px]  py-[10px]">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-4 poppin">
          <h2 className="text-3xl font-semibold text-gray-800 poppin">Biz bilan bog‘lanish</h2>
          <p className="text-[#01284099] text-[14px] md:text-[16px] poppin">
            Lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit
            lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor.
          </p>

          {/* Social Media Links */}
          <div className="grid grid-cols-2 gap-4 max-w-xs mt-6">
            <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-pink-500">
              <img src={Instagram} alt="instagram" />
              <span className="poppin">Instagram</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-red-600">
                 <img src={Youtube} alt="instagram"/>
              <span className="poppin">YouTube</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-[#1E9FD9]">
               <img src={Telegram} alt="instagram"/>
              <span className="poppin">Telegram</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-black">
                 <img src={Twitter} alt="instagram"/>
              <span className="poppin">Twitter</span>
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={SupportService}
            alt="Customer Support"
            className="w-full max-w-md"
          />
        </div>
      </div>
      </section>
      <section className="relative w-full px-6 md:px-16 py-12 custom-container">
        {/* Contact Info Box */}
        <div className="absolute top-45 lg:top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-[-2px_-2px_75px_4px_rgba(0,_0,_0,_0.1)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between w-11/12 md:w-3/4 lg:w-2/3">
          {/* Location */}
          <div className="flex flex-col items-center text-center px-4">
            <FaMapMarkerAlt className="text-[#1E9FD9] text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Location</h3>
            <p className="text-gray-600 text-sm">
              Qashqadaryo viloyati, Oqqo‘rg‘on tumani, 12-uy
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center px-4 mt-6 md:mt-0">
            <FaEnvelope className="text-[#1E9FD9] text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Email Address</h3>
            <p className="text-gray-600 text-sm">Outlook@gmail.com</p>
            <p className="text-gray-600 text-sm">Pinterest@gmail.com</p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center text-center px-4 mt-6 md:mt-0">
            <FaPhoneAlt className="text-[#1E9FD9] text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Phone Number</h3>
            <p className="text-gray-600 text-sm">+998(90)-122-21-12</p>
            <p className="text-gray-600 text-sm">+998(33)-323-23-23</p>
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
