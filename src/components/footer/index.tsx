import GnsWhite from "../../assets/gns-white.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12222D] text-white mt-[120px]">
      <div className="custom-container py-[80px] flex gap-[30px] items-baseline lg:flex-row flex-col lg:justify-between justify-center">
        {/* Logo & Description */}
        <div className="flex flex-col justify-between lg:w-[370px]">
          <img src={GnsWhite} alt="white logo" className="w-[250px]" />
          <p className="text-gray-400 text-[16px] sm:text-[14px] md:text-[15px] poppin">
            Design Analysis & Evaluation Introduction to API Design Analysis &
            Evaluation Introduction to API Design Analysis & Evaluation
            Introduction.
          </p>
          <button className="relative mt-8 h-12 w-40 overflow-hidden border-[2px] border-[#FFFF] text-[16px] sm:text-[14px] md:text-[15px] rounded-[20px] text-[#FFFF] font-[500] poppin transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#1E9FD9] before:duration-300 before:ease-out hover:text-white hover:shadow-[#1E9FD9] hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
            <a
              href="https://t.me/Genius_cup_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10"
            >
              Ro'yxatdan O'tish
            </a>
          </button>
        </div>

        <div className="flex justify-between gap-5">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg sm:text-[16px] md:text-[17px] font-semibold">Navigation</h3>
            <ul className="mt-3 space-y-2 text-gray-400 text-sm sm:text-[12px] md:text-[13px]">
              <li><a href="/">Home</a></li>
              <li><a href="sovrinlar">Sovrinlar </a></li>
              <li><a href="nizom">Nizom </a></li>
              <li>  <a href="maqolalar"> Maqolalar</a></li>
              <li> <a href="savollar">FAQ</a></li>
              <li>   <a href="boglanish"> Bog‘lanish </a></li>
            </ul >
          </div >

          {/* Contacts */}
          <div >
            <h3 className="text-lg sm:text-[16px] md:text-[17px] font-semibold">Contacts</h3>
            <p className="text-gray-400 text-sm sm:text-[12px] md:text-[13px] mt-3">
              (+998 55) 404-11-66;
            </p>
            <p className="text-gray-400 text-sm sm:text-[12px] md:text-[13px]">
              Qashqadaryo viloyati, Qarshi tuman, Chaman MFY, Mustaqillik ko’chasi, 41-uy.
            </p>
          </div >
        </div >
      </div >

      {/* Bottom Text */}
      <div className="mt-10 border-t border-gray-700 pt-5 flex justify-between text-center text-gray-500 text-sm sm:text-[12px] md:text-[13px] custom-container" >
        <p>Lorem Ipsum dolor sit lorem ipsum</p>
        <p>© Copyright 2019 Povert. All rights reserved.</p>
      </div >
    </footer >
  );
};

export default Footer;
