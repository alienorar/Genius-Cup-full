import NewsSt from "../../assets/news-1.png"

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  link:""
}

const newsData: NewsItem[] = Array(9).fill({
  id: 1,
  title: "Design Analysis & Evaluation Introduction to API",
  date: "May 15, 2024",
  description: "Design Analysis & Evaluation on an Introduction to API Design",
  imageUrl:NewsSt,
}).map((item, index) => ({ ...item, id: index + 1 }));

const categories = [
  { name: "Testlarga oid", count: 0},
  { name: "O'qishga oid", count: 0 },
  { name: "Universitetga oid", count: 0 },
  { name: "Foydali ma'lumotlar", count: 0 },
];

const NewsSection: React.FC = () => {
  return (
   <section>
<div className="mb-8 text-center poppin">
      {/* Subheading - "Maqolalar" */}
      <p className="text-lg sm:text-xl md:text-2xl text-[#1E9FD9] font-medium mb-2">
        Maqolalar
      </p>
      
      {/* Main Heading - "Yangilik va Maqolalar" */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
        Yangilik va Maqolalar
      </h2>
      
      
    </div>
     <div className="custom-container mx-auto px-4 py-8 grid md:grid-cols-4 gap-6">
      {/* News Section */}
      <div className="md:col-span-3">
        <h2 className="text-2xl font-bold mb-4">So‘nggi yangiliklar</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {newsData.map((news) => (
            <div key={news.id} >
              <img src={news.imageUrl} alt={news.title} className="w-full h-[200px] object-cover rounded-[20px]" />
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
        <h3 className="text-xl font-bold mb-4">Bo‘limlar</h3>
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
              <img src={news.imageUrl} alt={news.title} className="w-[121px] h-[90px] object-cover rounded-[20px]" />
              <div>
                <h4 className="text-[14px] font-[600] text-[#012840] poppin">{news.title}</h4>
                <a href="#" className="text-[#012840] poppin text-xs">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   </section>
  );
};

export default NewsSection;