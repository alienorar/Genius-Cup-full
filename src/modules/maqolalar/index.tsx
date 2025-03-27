import NewsSt from "../../assets/news-1.png"
import NewsNd from "../../assets/news-2.png"
import NewsRd from "../../assets/news-3.png"
import { motion } from "framer-motion";

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
    title: "IQ: Tug‘ma Iqtidor yoki Mashq Natijasi",
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

const categories = [
  { name: "Testlarga oid", count: 0 },
  { name: "O'qishga oid", count: 0 },
  { name: "Universitetga oid", count: 0 },
  { name: "Foydali ma'lumotlar", count: 3 },
];

const NewsSection: React.FC = () => {
  return (
    <section>
      <motion.div initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8 text-center poppin">
        {/* Subheading - "Maqolalar" */}
        <p className="text-sm sm:text-xl poppin md:text-[16px] text-[#1E9FD9] font-medium mb-1">
          Maqolalar
        </p>

        {/* Main Heading - "Yangilik va Maqolalar" */}
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold poppin text-black">
          Yangilik va Maqolalar
        </h2>


      </motion.div>
      <motion.div initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }} className="custom-container mx-auto px-4 py-8 grid md:grid-cols-4 gap-6">
        {/* News Section */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-semibold poppin mb-4">So‘nggi yangiliklar</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {newsData.map((news) => (
              <div key={news.id} >
                <img src={news.image} alt={news.title} className="w-full h-[200px] object-cover rounded-[20px]" />
                <p className="text-[#01284099] text-[17px]  mt-3">{news.date}</p>
                <h3 className="text-[#061A40] lg:text-[24px] md:text-[22px] text-[20px] font-bold ">{news.title}</h3>
                <p className="text-[#01284099] text-[17px]  mt-1">{news.description}</p>
                <a
                  href={news.link}
                  className="text-[#012840] font-medium text-[18px] mt-3 inline-block"
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          {/* Categories */}
          <h3 className="text-xl font-semibold poppin mb-4">Bo‘limlar</h3>
          <ul className="bg-[#E7ECFF] shadow-md rounded-lg p-4">
            {categories.map((category, index) => (
              <li key={index} className="flex justify-between py-2 poppin text-[18px]">
                <span className="text-[#353535]">{category.name}</span>
                <span className="text-gray-500">({category.count})</span>
              </li>
            ))}
          </ul>

          {/* Popular News */}
          <h3 className="text-xl font-bold mt-6 mb-4">Eng ko‘p o‘qilganlar</h3>
          <div className=" h-100">
            {newsData.slice(0, 4).map((news) => (
              <div key={news.id} className="flex items-center  justify-between gap-2 h-25 ">
                <img src={news.image} alt={news.title} className="w-[121px] h-[90px] object-cover rounded-[20px]" />
                <div>
                  <h4 className="text-[14px] font-[600] text-[#012840] poppin">{news.title}</h4>
                  <a href="#" className="text-[#012840] poppin text-xs">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsSection;