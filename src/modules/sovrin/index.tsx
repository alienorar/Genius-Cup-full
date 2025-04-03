import PrizeImg from "../../assets/prize-img.png"
import Gold from "../../assets/gold.svg"
import Silver from "../../assets/silver.svg"
import Bronze from "../../assets/bronze.svg"
import { motion } from "framer-motion";

const PrizeFundSection = () => {
  const prizes = [
    {
      id: 1,
      image: Gold,
      amount: "3.000.000",
      description: "1-o‘rin uchun mukofot",
      color: "text-[#1E9FD9]",
    },
    {
      id: 2,
      image: Silver,
      amount: "2.000.000",
      description: "2-o‘rin uchun mukofot",
      color: "text-[#1E9FD9]",
    },
    {
      id: 3,
      image: Bronze,
      amount: "1.000.000",
      description: "3-o‘rin uchun mukofot",
      color: "text-[#1E9FD9]",
    },
  ];

  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-between gap-8 custom-container poppin">
        {/* Left Side (Text) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:px-[100px] lg:py-[100px] px-[20px] text-center flex flex-col justify-center items-center lg:items-start"
        >
         <h2 className="text-[#1E9FD9] text-center lg:text-start text-[34px] md:text-3xl font-bold">
            Ajoyib imkoniyatlar
          </h2>
          <h3 className="text-[#000000] text-center lg:text-start text-[28px]  font-bold mt-1">
       Musobaqa g'oliblari uchun
          </h3>
          <p className="text-[#01284099] mt-4 text-[18px] poppin md:text-base text-center lg:text-start leading-relaxed lg:w-[543px]">
            Musobaqada eng yaxshi natijalarni ko'rsatgan ishtirokchilar nafaqat pul mukofotlari, 
            balki Osiyo texnologiyalar universitetida tahsil olish imkoniyatini qo'lga kiritadilar. 
            9-11-sinf o'quvchilari uchun alohida grantlar ajratilgan.
          </p>
          <button className="relative mt-3.5 h-10 w-40 overflow-hidden border-[2px] border-[#1E9FD9] text-[16px] rounded-[30px] text-[#1E9FD9] font-[500] poppin transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#1E9FD9] before:duration-300 before:ease-out hover:text-white hover:shadow-[#1E9FD9] hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
            <a href="https://t.me/Genius_cup_bot" target="_blank" rel="noopener noreferrer" className="relative z-10">
              Ro'yxatdan o'tish
            </a>
          </button>
        </motion.div>

        {/* Right Side (Image) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm lg:max-w-md"
        >
          <img
            src={PrizeImg}
            alt="Winners Celebration"
            className="w-full object-cover"
          />
        </motion.div>
      </section>

      <section className="custom-container">
        <div className="flex flex-col md:flex-row justify-center gap-3 py-10 text-center lg:px-[60px]">
          {prizes.map((prize) => (
            <div key={prize.id} className="flex flex-col w-full items-center">
              <img
                src={prize.image}
                alt={`Rank ${prize.id}`}
                className="w-24 md:w-28 lg:w-32 transition-transform ease-linear duration-500 hover:transform hover:rotate-y-360"
              />
              <p className="text-gray-700 mt-4 text-lg md:text-xl">
                {prize.description}: <br />
                <span className={`font-bold ${prize.color}`}>{prize.amount}</span> so'm
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8 text-black custom-container px-20 md:px-10 lg:px-20">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center lg:text-start">Final bosqich g'oliblari</h2>
        <p className="lg:text-[20px] text-[18px] font-semibold md:text-base mb-4 text-center lg:text-start">
          Musobaqaning final bosqichida umumiy guruhlar kesimida har bir guruhdan eng kam vaqt sarflagan holda,
          eng yuqori natijaga qayd etgan 3 nafar g'olib saralanadi.
        </p>
        <p className="lg:text-[20px] text-[18px] font-semibold md:text-base mb-2 text-center lg:text-start">
          Birinchi o'rinni qayd etgan ishtirokchilar <span className="text-[#1E9FD9]">3.000.000</span>  so'm,
          ikkinchi o'rinni qayd etgan ishtirokchi <span className="text-[#1E9FD9]">2.000.000</span> so'm,
          uchinchi o'rinni qayd etgan ishtirokchi <span className="text-[#1E9FD9]">1.000.000</span> so'm pul mukofotlari bilan taqdirlanadi.
        </p>
        <p className="lg:text-[20px] text-[18px] md:text-base font-semibold text-center lg:text-start">
          Uchinchi guruh (9-11-sinflar) ishtirokchilarining eng yuqori ball to'plagan 10 nafari Osiyo
          texnologiyalar universitetida bir yil bepul o'qish imkoniyatini qo'lga kiritadi.
        </p>
      </section>
    </>
  );
};

export default PrizeFundSection;