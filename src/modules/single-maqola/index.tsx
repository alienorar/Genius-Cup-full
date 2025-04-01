import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NewsSt from "../../assets/news-1.png";
import NewsNd from "../../assets/news-2.png";
import NewsRd from "../../assets/news-3.png";
import { motion } from "framer-motion";

const newsData = [
  {
    id: 1,
    date: "May 15, 2024",
    title: "Intellekt, Strategiya, Muvaffaqiyat",
    description:
      "Ko'pchilik IQ darajasi yuqori bo'lgan odamlar hayotda doimo ustunlikka ega deb o'ylaydi. Lekin haqiqat shuki, faqat aqlning o'zi yetarli emas..",
    fullContent: `
      <p>Ko'pchilik IQ darajasi yuqori bo'lgan odamlar hayotda doimo ustunlikka ega deb o'ylaydi. Lekin haqiqat shuki, faqat aqlning o'zi yetarli emas. Hayotda muvaffaqiyat qozonish uchun intellekt bilan birga strategik fikrlash, ijodkorlik va hissiy aqllilik ham muhim rol o'ynaydi.</p>
      <p>Yangi tadqiqotlar shuni ko'rsatadiki, yuqori IQga ega bo'lish har doim ham katta muvaffaqiyatlar bilan bog'liq emas. Buning o'rniga, "amaliy aql" deb ataladigan qobiliyat - ya'ni bilimlarni amaliyotda qo'llash, muammolarni hal qilish va munosabatlarni boshqarish ko'nikmalari ko'proq muhim bo'lishi mumkin.</p>
      <p>Shuning uchun, agar siz o'z IQ darajangizdan qoniqmagan bo'lsangiz, tushkunlikka tushmang. Doimiy ravishda o'qish, yangi narsalarni o'rganish va murakkab vaziyatlarda qaror qabul qilish ko'nikmalarini rivojlantirish orqali siz ham katta muvaffaqiyatlarga erishishingiz mumkin.</p>
    `,
    image: NewsSt,
    link: "maqolalar",
  },
  {
    id: 2,
    date: "May 15, 2024",
    title: "IQ: Tug'ma Iqtidor yoki Mashq Natijasi",
    description:
      "IQ – insonning aqliy qobiliyatini o'lchovchi ko'rsatkich. U tug'ma iqtidor yoki mashq orqali rivojlantirish mumkin bo'lgan qobiliyatmi?",
    fullContent: `
      <p>IQ – insonning aqliy qobiliyatini o'lchovchi ko'rsatkich. U tug'ma iqtidor yoki mashq orqali rivojlantirish mumkin bo'lgan qobiliyatmi? Bu savol psixologlar va nevrologlar tomonidan uzoq yillar davomida o'rganilgan.</p>
      <p>Yaqinda o'tkazilgan tadqiqotlar shuni ko'rsatadiki, IQning taxminan 50-80% genetik jihatdan belgilanadi. Qolgan qismi esa atrof-muhit, ta'lim va shaxsiy tajribalar ta'sirida shakllanadi. Bu shuni anglatadiki, biz o'z aqliy qobiliyatlarimizni ma'lum darajada rivojlantirishimiz mumkin.</p>
      <p>Misol uchun, bolalik davrida miya rivojlanishini qo'llab-quvvatlovchi muhit, to'g'ri ovqatlanish, jismoniy faollik va intellektual mashqlar IQ darajasini oshirishga yordam beradi. Kattalar uchun esa yangi ko'nikmalar o'rganish, chet tillarini o'rganish va mantiqiy o'yinlar bilan shug'ullanish foydali bo'ladi.</p>
    `,
    image: NewsNd,
    link: "maqolalar",
  },
  {
    id: 3,
    date: "May 15, 2024",
    title: "Mantiq, Hayotiy qarorlar, O'rganish",
    description:
      "Tadqiqotlar shuni ko'rsatadiki, doimiy ravishda mantiqiy masalalar va jumboqlar yechish IQ darajasining oshishiga olib keladi.",
    fullContent: `
      <p>Tadqiqotlar shuni ko'rsatadiki, doimiy ravishda mantiqiy masalalar va jumboqlar yechish IQ darajasining oshishiga olib keladi. Bu faoliyat miyaning turli qismlarini ishlatishga yordam beradi va yangi neyron aloqalar hosil bo'lishiga sabab bo'ladi.</p>
      <p>Mantiqiy fikrlash ko'nikmalari nafaqat testlarda yaxshi natijalarga erishishga, balki kundalik hayotda ham to'g'ri qarorlar qabul qilishga yordam beradi. Masalan, moliyaviy qarorlar, martaba tanlash yoki shaxsiy munosabatlardagi muammolarni hal qilishda mantiqiy yondashuv ko'p foyda keltiradi.</p>
      <p>O'rganish jarayonida esa mantiqiy fikrlash yangi bilimlarni tezroq va samaraliroq o'zlashtirishga imkon beradi. Shuning uchun har kuni kamida 15-20 daqiqani mantiqiy mashqlarga bag'ishlash tavsiya etiladi.</p>
    `,
    image: NewsRd,
    link: "maqolalar",
  },
];

const categories = [
  { name: "Testlarga oid", count: 0 },
  { name: "O'qishga oid", count: 0 },
  { name: "Universitetga oid", count: 0 },
  { name: "Foydali ma'lumotlar", count: 3 },
];

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedNews, setSelectedNews] = useState(newsData[0]);

  useEffect(() => {
    if (id) {
      const foundNews = newsData.find(news => news.id === parseInt(id));
      if (foundNews) {
        setSelectedNews(foundNews);
      }
    }
  }, [id]);

  return (
    <section className="pb-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8 text-center poppin"
      >
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold poppin text-black">
          Yangilik va Maqolalar
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="custom-container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6"
      >
        {/* Main News Content */}
        <div className="md:col-span-2">
          <div className="p-2 rounded-[20px]">
            <img
              src={selectedNews.image}
              alt={selectedNews.title}
              className="w-full h-[300px] sm:h-[400px] object-cover rounded-[20px]"
            />
            <p className="text-gray-600 text-lg mt-4">{selectedNews.date}</p>
            <h3 className="text-[#061A40] text-2xl sm:text-3xl font-bold mt-2">
              {selectedNews.title}
            </h3>
            <p className="text-gray-600 text-lg mt-4">{selectedNews.description}</p>
            
            {/* Full Content */}
            <div 
              className="prose max-w-none mt-6 text-gray-700"
              dangerouslySetInnerHTML={{ __html: selectedNews.fullContent }}
            />
            
            {/* Back Button */}
            <div className="mt-8">
              <Link
                to="/maqolalar" 
                className="inline-flex items-center px-4 py-2 bg-[#061A40] text-white rounded-lg hover:bg-[#012840] transition-colors"
              >
                ← Barcha yangiliklarga qaytish
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          {/* Popular News */}
          <h3 className="text-xl font-bold mt-6 mb-4">Eng ko'p o'qilganlar</h3>
          <div className="space-y-4">
            {newsData
              .filter(news => news.id !== selectedNews.id)
              .slice(0, 3)
              .map((news) => (
                <div 
                  key={news.id} 
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => setSelectedNews(news)}
                >
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-[100px] h-[75px] object-cover rounded-[15px]" 
                  />
                  <div>
                    <h4 className="text-[14px] font-[600] text-[#012840] poppin">
                      {news.title}
                    </h4>
                    <a href={`/maqolalar/${news.id}`} className="text-[#012840] poppin text-xs block mt-1">
                      Batafsil →
                    </a>
                  </div>
                </div>
              ))}
          </div>
          
          {/* Categories */}
          <h3 className="text-xl font-semibold poppin mt-8 mb-4">Bo'limlar</h3>
          <ul className="bg-[#E7ECFF] shadow-md rounded-lg p-4">
            {categories.map((category, index) => (
              <li key={index} className="flex justify-between py-2 poppin text-[18px]">
                <span className="text-[#353535]">{category.name}</span>
                <span className="text-gray-500">({category.count})</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsDetailPage;