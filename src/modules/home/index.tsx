import YellowSpot from "../../assets/Ellipse 2.svg"
import Brain from "../../assets/brain.png"
import Arrow from "../../assets/arrow.png"
import BlueSpot from "../../assets/ellipse1.png"
import IqSt from "../../assets/iq-st.png"
import Iqnd from "../../assets/iq-nd.png"
import AverageIq from "../../assets/average-it.png"
import KnowledgeIq from "../../assets/study-iq.png"
import FinanceIq from "../../assets/finance-iq.png"
import OtuLogo from "../../assets/otu-logo 2.png"
import ArrowWhite from "../../assets/arrow.svg"
import WhiteSpot from "../../assets/Ellipse 4.svg"
import NewsSt from "../../assets/news-1.png"
import NewsNd from "../../assets/news-2.png"
import NewsRd from "../../assets/news-3.png"
import Feather from "../../assets/feather.svg"
import { motion } from "framer-motion";

const Index = () => {

  const iqData = [
    {
      title: "O‘rtacha IQ Darajasi",
      description:
        " Aholining katta qismi (taxminan 68%) 85 dan 115 gacha IQ darajasiga ega",
      imgSrc: AverageIq,
      color: "text-[#1E9FD9]",
    },
    {
      title: "IQ va Ta’lim Darajasi",
      description:
        "Oliy ma’lumotga ega bo‘lgan odamlarning o‘rtacha IQ darajasi 110-120 IQ oralig‘ida",
      imgSrc: KnowledgeIq,
      color: "text-purple-600",
    },
    {
      title: "Moliyaviy Muvaffaqiyat",
      description:
        "IQ 130+ bo‘lganlar boshqalarga qaraganda 2-3 barobar yuqori daromad qilishadi",
      imgSrc: FinanceIq,
      color: "text-green-600",
    },
  ];

  const stages = [
    {
      title: "Birinchi bosqich",
      description:
        "Musobaqaning birinchi bosqichi online tarzda quyida keltirilgan telegram botlar orqali o'tkaziladi. Musobaqada ishtirok etish uchun oldindan ro'yxatdan o'tib qo'yishingiz zarur!",
      type: "Online",
      date: "01.05.2025",
      buttonText: "Ro‘yxatdan o‘tish",
      bgColor: "bg-white",
    },
    {
      title: "Ikkinchi bosqich",
      description:
        "Musobaqaning ikkinchi bosqichi offline tarzda o'tkaziladi. Musobaqada ishtirok etish uchun oldindan ro'yxatdan o'tib qo'yishingiz zarur!",
      type: "Offline",
      date: "15.05.2025",
      buttonText: "Ro‘yxatdan o‘tish",
      bgColor: "bg-white",
    },
  ];

  const schedule = [
    { grades: <span className="font-bold text-black block">3-4-5</span>, description: "Sinf o’quvchilari", location: <span className="font-bold text-black block">Online</span>, date: <span className="font-bold text-black block">1-may</span>, time: "9:00dan 10:00gacha" },
    { grades: <span className="font-bold text-black block">6-7-8</span>, description: "Sinf o’quvchilari", location: <span className="font-bold text-black block">Online</span>, date: <span className="font-bold text-black block">1-may</span>, time: "11:00dan 12:00gacha" },
    { grades: <span className="font-bold text-black block">9-10-11</span>, description: "Sinf o’quvchilari", location: <span className="font-bold text-black block">Online</span>, date: <span className="font-bold text-black block">1-may</span>, time: "11:00dan 12:00gacha" },
    { grades: <span className="font-bold text-black block">1-2</span>, description: "Bosqich akademik litsey talabalari", location: <span className="font-bold text-black block">Online</span>, date: <span className="font-bold text-black block">1-may</span>, time: "11:00dan 12:00gacha" },
  ];

  const organizers = [
    
    {
      name: "Osiyo Texnologiyalar Universiteti",
      logo: OtuLogo,
      link: "https://www.otu-edu.uz",
    },
  ];

  const newsData = [
    {
      id: 1,
      date: "May 15, 2024",
      title: " Intellekt, Strategiya, Muvaffaqiyat",
      description:
        "Ko‘pchilik IQ darajasi yuqori bo‘lgan odamlar hayotda doimo ustunlikka ega deb o‘ylaydi. Lekin haqiqat shuki, faqat aqlning o‘zi yetarli emas..",
      image: NewsSt,
      link: "maqolalar",
    },
    {
      id: 2,
      date: "May 15, 2024",
      title: "Iqtidor yoki Mashq Natijasi",
      description:
        "IQ – insonning aqliy qobiliyatini o‘lchovchi ko‘rsatkich. U tug‘ma iqtidor  yoki mashq orqali rivojlantirish mumkin bo‘lgan qobiliyatmi?",
      image: NewsNd,
      link: "maqolalar",
    },
    {
      id: 3,
      date: "May 15, 2024",
      title: "Mantiq, Hayotiy qarorlar, O‘rganish",
      description:
        " Tadqiqotlar shuni ko‘rsatadiki, doimiy ravishda mantiqiy masalalar va jumboqlar yechish IQ darajasining oshishiga olib keladi.",
      image: NewsRd,
      link: "maqolalar",
    },
  ];;

  return (
    <main className="flex flex-col gap-[40px]">
      {/* ==============hero ============ */}
      <section className="custom-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col justify-center items-center gap-[20px] pt-[60px]">
          <div>
            <div className="flex justify-between items-end">
              <img src={YellowSpot} alt="yellow spot" />
              <img src={Brain} alt="brain" />
            </div>
            <h1 className="poppin lg:text-[56px] md:text-[50px] text-[40px] text-black text-center font-bold ">"Aql va zakovat sinovidan o‘tib, kelajak yetakchilariga aylaning!"</h1>
            <div className=" flex items-end px-[40px] justify-around ">
              <img src={Arrow} alt="arrow icon" className="hidden md:block" />
              <p className=" text-[#01284099]  text-[22px] font-[400] text-center poppins">Bilimingizni sinang, mantiqiy fikrlash qobiliyatingizni oshiring va kelajak yetakchilari qatoridan joy oling!
                Intellektual sinovlar orqali o‘z imkoniyatlaringizni kashf eting!</p>
              <img src={BlueSpot} alt="Blue spot" className="hidden md:block" />
            </div>
          </div>
          <div className="flex justify-between md:justify-center w-full items-center ">
            <img src={Arrow} alt="arrow icon" className="block md:hidden h-[100px] w-[100px] -rotate-45" />
            <button className="relative h-12 w-40 overflow-hidden border-[2px] border-[#1E9FD9] text-[16px] rounded-[30px] text-[#1E9FD9] font-[500] poppin  transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#1E9FD9] before:duration-300 before:ease-out hover:text-white hover:shadow-[#1E9FD9] hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
              <a href="https://t.me/Genius_cup_bot" target="_blank" rel="noopener noreferrer" className="relative z-10">
                Ro'yxatdan O'tish
              </a>
            </button>
            <img src={BlueSpot} alt="Blue spot" className="block md:hidden h-[100px] w-[100px] object-none " /></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col gap-0">
          <div className="flex  justify-end items-end pl-0 "><img src={Feather} alt="feather" className="-rotate-20 " /></div>
          <div className="bg-gradient-to-br from-[#E7ECFF] to-[#dde3f8] p-[10px] sm:p-[30px] md:p-[40px] lg:p-[60px] rounded-3xl rounded-tr-[40px] md:rounded-tr-[60px] sm:rounded-[25px] md:rounded-[30px]   flex items-center justify-center lg:h-[704px] relative"
          >
            <div className="absolute top-10 left-9 w-18 h-18 bg-gradient-to-r from-white to-transparent rounded-full"></div>
            <div className="relative bg-transparent rounded-[30px] p-[10px] sm:p-5 md:p-8 lg:p-[30px] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto border-[4px] border-dashed border-[#FFFFFF] w-full "
            >
              {/* Dashed Border Effect */}
              <div className="w-full rounded-[30px] lg:p-6 p-3 md:p-10 flex flex-col bg-white relative gap-2 lg:h-[364px]">
                {/* Title */}
                <h4 className="text-[#1E9FD9] poppin font-medium text-sm md:text-base">
                  Aql-idrokingizni sinovdan o‘tkazing
                </h4>
                <h2 className="text-[#061A40] lg:text-[32px] md:text-3xl font-bold mt-2">
                  IQ – darajangizni biz bilan o‘lchang.
                </h2>

                {/* Description */}
                <p className="text-[#01284099]  lg:text-[18px] lg:font-[400] text-[14px] md:text-[16px] poppins">
                  IQ darajangiz – bu sizning fikrlash tezligingiz, muammolarni hal qilish qobiliyatingiz
                  va intellektual salohiyatingizning kaliti. O‘z imkoniyatlaringizni kashf eting, yangi
                  bilimlar bilan ongingizni charxlang va har kuni o‘zingizning eng yaxshi versiyangiz bo‘lishga
                  intiling! Aql-u idrokingizni sinang – siz doim o‘ylaganingizdan ham aqilliroqsiz!
                </p>

                {/* Floating Images */}
                <div className="flex  md:flex-nowrap sm:justify-between items-center gap-[10px] bg-cover">
                  <img
                    src={Iqnd}
                    alt="Child with Abacus"
                    className="lg:absolute  h-[80px] w-[140px]  lg:top-[-100px] lg:right-[-90px] lg:w-[245px] md:w-[200px]  md:h-[180px]  lg:h-[200px] object-cover rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-110"
                  />
                  <img
                    src={IqSt}
                    alt="Kids Experimenting"
                    className="lg:absolute  h-[80px]  w-[140px]  lg:bottom-[-110px] lg:left-[-100px] lg:w-[245px] md:w-[200px] md:h-[180px] lg:h-[200px]   object-cover rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-110"
                  />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </section>
      {/* ============= About Iq============ */}
      <section className="bg-[#F7FAFF] py-20 ">
        <div className="custom-container poppin">
          <div className="text-center">
            {/* Section Title */}
            <h2 className="text-[#061A40]  md:text-4xl font-bold">
              IQ, Ta’lim va Muvaffaqiyat
            </h2>

            {/* Three Card Sections */}
            <div className="flex flex-wrap justify-center gap-5 mt-12">
              {iqData.map((item, index) => (
                <div
                  key={index}
                  className="bg-transparent px-4 flex flex-col justify-baseline gap-3 h-auto w-full sm:w-[350px] md:w-[400px] items-center text-center transition-transform transform hover:scale-105"
                >
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-[180px] h-[150px] md:w-[200px] md:h-[170px] object-cover"
                  />
                  <h3 className={`${item.color} lg:text-[28px] text-[24px]  md:text-[26px] font-bold`}>
                    {item.title}
                  </h3>
                  <p className="text-[#01284099] text-[15px] md:text-[18px] font-semibold mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* =================== Steps ========== */}
      <section className="custom-container ">
        <div className=" lg:py-10  poppin ">
          <div>  <h2 className="lg:text-[40px] md:text-[36px] text-[30px] font-bold text-center text-[#012840] pb-2 ">
            Musobaqa Bosqichlari
          </h2>
            <p className="text-center text-[#01284099] text-[20px] lg:mb-[100px] mb-0 lg:w-[600px] flex items-center justify-between mx-auto">
              «Genius Cup» IQ-turniri ikki bosqichda o'tkaziladi va quyida o'tkazish
              vaqtlari bilan tanishing
            </p></div>
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} gap-[20px]   items-start mt-[100px]`}
            >
              {/* Step card */}
              <div className="lg:py-4  bg-transparent  flex flex-col gap-2 justify-center lg:justify-between lg:items-start items-center">
                <h3 className="text-[#061A40] lg:text-[42px] md:text-[36px] text-[28px] text-center lg:text-start font-bold mt-2">{stage.title}</h3>
                <p className="text-[#01284099] text-lg text-[18px] font-[400] poppins text-center lg:text-start lg:w-[530px]">{stage.description}</p>

                <div className="grid grid-cols-2 lg:gap-[80px] justify-between gap-5 lg:mt-3  ">
                  <div>
                    <span className="text-[20px] lg:text-[24px] md:text-[22px]  font-bold text-[#012840]">{stage.type}</span>
                    <p className="text-[#01284099] ">O‘tish tartibi</p>
                  </div>
                  <div>
                    <span className="text-[22px] lg:text-[28px] md:text-[26px]  font-bold text-[#012840]">{stage.date}</span>
                    <p className="text-[#01284099] text-sm">O‘tkazilish sanasi</p>
                  </div>
                </div>
                <button className="relative mt-8 h-12 w-40 overflow-hidden border-[2px] border-[#1E9FD9] text-[16px] rounded-[30px] text-[#1E9FD9] font-[500] poppin  transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#1E9FD9] before:duration-300 before:ease-out hover:text-white hover:shadow-[#1E9FD9] hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                  <a href="https://t.me/Genius_cup_bot" target="_blank" rel="noopener noreferrer" className="relative z-10">
                    Ro'yxatdan O'tish
                  </a>
                </button>
              </div>
              <div className={`${index % 2 === 0 ? "bg-[#DCE1F899]" : "bg-[#E2F6FD99]"} px-6 py-5 xl:h-[400px]  rounded-3xl mx-auto poppin`}>
                <div className="grid text-[#012840] grid-cols-2 lg:grid-cols-3 gap-4 text-center font-semibold">
                  <span className="bg-white rounded-2xl md:px-4 md:py-5 py-3 px-3">O‘tkazilish sanasi</span>
                  <span className="bg-white rounded-2xl md:px-4 md:py-5 py-3 px-3 hidden lg:block">O‘tkazilish Manzili</span>
                  <span className="bg-white rounded-2xl md:px-4 md:py-5 py-3 px-3">Vaqtlar</span>
                </div>
                {schedule.map((item, i) => (
                  <div key={i} className="grid grid-cols-2 lg:grid-cols-3 gap-5 px-2 text-center mt-3">
                    <span className="text-[#012840B2] font-[500] text-[16px] md:px-3   px-3">{item.grades} Sinf o‘quvchilari</span>
                    <span className="hidden lg:block text-[#010f18b2] font-[500] text-[14px] md:px-3   px-3">{index === 0 ? "Online Telegram Bot " : "Offline Osiyo Texnologiyalar Universiteti "}</span>
                    <span className="text-[#062030b2] font-[500] text-[16px] md:px-3  px-3">{index === 0 ? "1-May " : "15-May "} {item.time} gacha</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ============= Organizers========== */}
      <section className="custom-container">
        <div className="bg-gradient-to-tl from-blue-800 via-blue-500 to-blue-800 rounded-4xl  text-white text-center py-6 md:py-10 custom-container">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-[32px] font-semibold poppin">Tashkilotchilar</h2>
            <p className=" text-[18px] font-[300] poppin lg:w-[600px] text-gray-50">
              Biz sizning kelajagingiz uchun qo'l uzatdik, siz buni javobsiz
              qoldirmaysiz degan umiddamiz!
            </p>
          </div>
          <div className="flex items-center justify-center lg:justify-between md:py-5 py-1">
            <img src={ArrowWhite} alt="arrow" className="hidden lg:block" />
            <div className="flex flex-col lg:flex-row justify-center gap-10 mt-6 py-2 px-5 md:px-5  border-dashed border-[2px] border-white  rounded-3xl">
              {organizers.map((org, index) => (
                <div key={index} className="bg-transparent p-4 md:p-6 text-center md:w-64 ">
                  <img src={org.logo} alt={org.name} className="mx-auto w-16 h-16 object-contain rounded-4xl" />
                  <h3 className="mt-4 mb-2 text-lg font-medium">{org.name}</h3>
                  <button className="relative h-10  w-40 overflow-hidden border-[1px]  border-[#ffffff] text-[16px] rounded-[30px] text-[#ffffff] font-[400] poppin  transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-white before:duration-300 before:ease-out hover:text-[#1E9FD9] hover:shadow-white hover:before:h-40 hover:before:w-40 ">
                    <a href={org.link} target="_blank" rel="noopener noreferrer" className="relative z-10">
                      Rasmiy sahifa ↗
                    </a>
                  </button>
                </div>
              ))}
            </div>
            <div className="w-[140px] hidden lg:block">
              <img src={WhiteSpot} alt="white spot" className="hidden lg:block" />
            </div>
          </div>

        </div>
      </section>
      {/* =================== News=========== */}
      <section className="custom-container">
        <div className="flex justify-between flex-col md:flex-row items-center py-4">
          <div>
            <h2 className="text-[32px] font-semibold poppin text-center md:text-start">So’nggi Yangiliklar</h2>
            <p className="text-[18px] text-center md:text-start py-2 font-[300] poppin lg:w-[600px] text-[#01284099]">
              «Genius Cup» IQ-turniri ikki bosqichda o‘tkaziladi va quyida o‘tkazish
              vaqtlari bilan tanishing
            </p>
          </div>
          <button className="relative h-12 w-40 overflow-hidden border bg-gradient-to-br rounded-[30px] from-sky-600 to-blue-800 text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
            <a href="maqolalar" rel="noopener noreferrer" className="relative z-10">
              Barchasini ko'rish
            </a>
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {newsData.map((news) => (
            <div key={news.id} >
              <img src={news.image} alt={news.title} className="w-full h-[200px] object-cover rounded-[20px] transition duration-300 ease-in-out hover:scale-90" />
              <p className="text-[#01284099] text-[17px]  mt-3">{news.date}</p>
              <h3 className="text-[#061A40] lg:text-[24px] md:text-[22px] text-[20px] font-bold ">{news.title}</h3>
              <p className="text-[#01284099] text-[17px]  mt-1">{news.description}</p>
              <a
                href={news.link}
                className="text-[#012840] font-medium text-[15px] mt-3 inline-block"
              >
                MAQOLANI O'QISH →
              </a>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}

export default Index