import GnsWhite from "../../assets/gns-white.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12222D] text-white mt-[120px]">
      <div className="custom-container py-[80px] flex gap-[30px] items-baseline lg:flex-row flex-col lg:justify-between justify-center">
        {/* Logo & Description */}
        <div className="flex flex-col justify-between gap-2 lg:w-[370px]">
          <a href="/"><img src={GnsWhite} alt="white logo" className="w-[250px]" /></a>
          <p className="text-gray-400 text-[16px] sm:text-[14px] md:text-[15px] poppin">
            Genius Cup – Bilim. Mantiq. G‘alaba.
            Aqlingizni charxlang, chegaralaringizni sinang va eng yaxshilar bilan bellashing!
            Bu yerda aql-idrok ustuvor va g‘oliblar yaratiladi.
          </p>
          <button className="relative mt-8 h-12 w-40 overflow-hidden border-[2px] border-[#FFFF] text-[16px] sm:text-[14px] md:text-[15px] rounded-[20px] text-[#FFFF] font-[500] poppin transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#1E9FD9] before:duration-300 before:ease-out hover:text-white hover:shadow-[#1E9FD9] hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
            <a
              href="https://t.me/Genius_cup_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10"
            >
              Ro'yxatdan o'tish
            </a>
          </button>
        </div>

        <div className="flex justify-between lg:gap-[80px] gap-5">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg sm:text-[16px] md:text-[17px] font-semibold">Sahifalar</h3>
            <ul className="mt-3 space-y-2 text-gray-400 text-sm sm:text-[12px] md:text-[13px]">
              <li><a href="/">Home</a></li>
              <li><a href="sovrinlar">Sovrinlar </a></li>
              <li><a href="nizom">Nizom </a></li>
              <li><a href="maqolalar"> Maqolalar</a></li>
              <li><a href="savollar">FAQ</a></li>
              <li><a href="boglanish"> Bog‘lanish </a></li>
            </ul >
          </div >

          {/* Contacts */}
          <div >
            <h3 className="text-lg sm:text-[16px] md:text-[17px] font-semibold">Bog'lanish</h3>
            <a href="tel:+998901231166" className="text-gray-400 text-sm sm:text-[12px] md:text-[13px] mt-3">
              +998 (90)-123-11-66
            </a>
            <p className="text-gray-400 text-sm sm:text-[12px] md:text-[13px] lg:w-[300px] w-[220px]">
              Qashqadaryo viloyati, Qarshi tuman, Chaman MFY, Mustaqillik ko’chasi, 41-uy.
            </p>
          </div >
        </div >
      </div >

      {/* Bottom Text */}
      <div className="mt-10 border-t border-gray-700 py-5 flex justify-between text-center text-gray-500 text-sm sm:text-[12px] md:text-[13px] custom-container" >
        <p></p>
        <p>© 2025 Genius Cup. Barcha huquqlar himoyalangan.</p>
      </div >
    </footer >
  );
};

export default Footer;
