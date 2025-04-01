import React, { useState } from "react";
import { motion } from "framer-motion";
const sections = [
  {
    id: "1",
    title: "I bob",
    content: (
      <>
        <h2 className="text-[20px] font-semibold">
          1. Umumiy qoidalar
        </h2>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">1.1.</strong>	Mazkur Nizom Osiyo Texnologiyalar universitetining innovatsion tashabbusi sifatida respublikamizning barcha umumiy o‘rta ta’lim maktab o‘quvchilari, akademik litsey va kasbiy ta’lim muassasalari talabalari orasidan iqtidorli, bilimdon va yaratuvchan yoshlarga e’tibor qaratgan holda, ularni oliy ta’limga keng jalb etish hamda kelajakdagi muvaffaqiyatga yo‘l ochish maqsadida tashkil etayotgan “Genius-Cup” onlayn IQ musobaqasining tashkil etish tartibini belgilaydi.
        </p>
        <p className="text-[16px] text-[#01284099] poppin"><strong className="text-black">1.2.</strong> Imtihonlarda O‘zbekiston Respublikasidagi barcha umumiy o‘rta ta’lim maktablarining 3-11 sinf o‘quvchilari hamda akademik litsey va kasbiy ta’lim muassasalarining 1-2 bosqich talabalari ishtirok etishi mumkin.</p>
      </>
    ),
  },
  {
    id: "2",
    title: "II bob",
    content: (
      <>
        <h2 className="text-[20px] font-semibold">
          2.	Musobaqaning asosiy maqsad va vazifalari
        </h2>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">2.1</strong>  Musobaqaning asosiy maqsadi yoshlarimizning bilimini, mantiqiy fikrlashini va tezkor qaror qabul qilish qobiliyatini aniqlash va rivojlantirishdan iborat bo‘lib, quyidagi maqsadlarni ham qamrab oladi:
          <li>	Yoshlarimizga zamonaviy bilim va texnologiyalarni o‘zlashtirish imkoniyatini yaratish;</li>
          <li>	Ularning intellektual imkoniyatlarini oshirish va oliy ta’limga qiziqishini rag‘batlantirish.</li>

        </p>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">2.2</strong> Musobaqaning ustuvor Vazifasi qatnashuvchilarning shaxsiy rivojlanishini qo‘llab-quvvatlash bilan birga, jamiyatimizning intellektual salohiyatini oshirishga ham xizmat qiladi:
          <li>Yoshlarimizga zamonaviy bilim va texnologiyalarni o‘zlashtirish imkoniyatini yaratish;</li>
          <li>Innovatsion fikrlash va kreativ yondoshuvni rag‘batlantirish;</li>
          <li>Oliy ta’lim tizimiga kirish uchun malaka va qobiliyatlarni rivojlantirish;</li>
          <li>	Qatnashchilarni sog‘lom raqobat muhitida sinovdan o‘tkazish orqali ularning imkoniyatlarini aniq baholash.</li>
        </p>
      </>
    ),
  },
  {
    id: "3",
    title: "III bob",
    content: (
      <>
        <h2 className="text-[20px] font-semibold">
          3. Ishtirok etish shartlari
        </h2>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">3.1</strong> Musobaqada qatnashish uchun mo‘ljallangan auditoriyani quyidagilardan iborat:
          <li>O‘zbekiston Respublikasidagi barcha umumiy o‘rta ta’lim maktablarining 3–11-sinf o‘quvchilari;</li>
          <li>Akademik litsey va kasbiy ta’lim muassasalarining 1–2 bosqich talabalari.</li>

        </p>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">3.2</strong>  Qatnashuvchilarga  @Genius_cup_bot va  @Genius_cup2_bot telegram botlari orqali onlayn ro‘yxatdan o‘tishlari talab qilinadi.Musobaqa ham bevosita ushbu botlar orqali tashkil qilinadi. Ro‘yxatdan o‘tish jarayonlari joriy 2025-yiling  1-may sanasiga qadar amalga oshiriladi.
        </p>
      </>
    ),
  },
  {
    id: "4",
    title: "IV bob",
    content: (
      <>
        <h2 className="text-[20px] font-semibold">4. Musobaqani tashkil etish tartibi</h2>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">4.1</strong> Musobaqaning birinchi bosqichi ishtirokchilarning umumiy bilim, 
          mantiqiy fikrlash va tezkor qaror qabul qilish qobiliyatini sinovdan o‘tkazish uchun 
          mo‘ljallangan bo‘lib, 2025-yilning 10-may sanasida onlayn test shaklida telegram botlari 
          orqali o‘tkazilinadi.
        </p>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">4.2</strong> Musobaqa qatnashuvchilarining sinf kesimidan kelib chiqib, mos guruhlar uchun test savollari 
          shakllantiriladi:
          <li>Birinchi guruh - 3–5-sinf o‘quvchilari;</li>
          <li>Ikkinchi guruh - 6–8-sinf o‘quvchilari;</li>
          <li>Uchinchi guruh - 9–11-sinf o‘quvchilari va akademik litsey, kasbiy ta’lim muassasalarining 1–2 bosqich talabalari.</li>
        </p>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">4.3</strong> Test savollari va baholash tizimi:
          <li>Har bir ishtirokchiga 20 ta savol taqdim etiladi;</li>
          <li>To‘g‘ri javob uchun 5 ball, noto‘g‘ri javob uchun 0 ball beriladi;</li>
          <li>Eng yuqori ball 100 ballni tashkil etadi.</li>
        </p>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">4.4</strong> Testni bajarish uchun 60 daqiqa vaqt ajratiladi. 
          Eng yuqori ball to‘plagan 100 nafar ishtirokchi g‘olib deb tanlanadi.
          <li>3–5-sinf: 20 nafar;</li>
          <li>6–8-sinf: 40 nafar;</li>
          <li>9–11-sinf va yuqorilar: 40 nafar.</li>
          Ball teng bo‘lsa, testni tugatish vaqti hal qiluvchi omil hisoblanadi.
        </p>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">4.5</strong> G‘oliblarga mukofotlar:
          <li>Har bir bosqich g‘olibiga sertifikat va 100 000 so‘m miqdorida pul mukofoti;</li>
          <li>Ikkinchi bosqichga yo‘llanma.</li>
        </p>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">4.6</strong> Ikkinchi bosqich 2025-yil 10-may kuni Osiyo Texnologiyalar universitetida o'tkaziladi.
        </p>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">4.7</strong> Final bosqichida har bir guruhdan eng yuqori natija qayd etgan 3 nafar g‘olib quyidagi mukofotlarga ega bo‘ladi:
          <li>1-o‘rin: 3 000 000 so‘m;</li>
          <li>2-o‘rin: 2 000 000 so‘m;</li>
          <li>3-o‘rin: 1 000 000 so‘m.</li>
          <li>Uchinchi guruhning eng yuqori ball to‘plagan 10 nafari Osiyo Texnologiyalar universitetida bir yil bepul o‘qish imkoniyatiga ega bo‘ladi.</li>
        </p>
      </>
    ),
  },
  {
    id: "5",
    title: "V bob",
    content: (
      <>
        <h2 className="text-[20px] font-semibold">IV. Yakuniy qoidalar</h2>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">7.</strong> Ishtirokchilar tomonidan taqdim etilgan materiallar bo‘yicha izoh yoki sharh berilmaydi va ular egalariga qaytarilmaydi.
        </p>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">8.</strong> Ishtirokchilar tomonidan mazkur Nizom va imtihonlarda ishtirok etish tartib-qoidalari buzilgan taqdirda 
          Komissiya a’zolarining xulosasi bilan sinovlardan chetlatiladi.
        </p>
        <p className="text-[16px] text-[#01284099] poppin">
          <strong className="text-black">9.</strong> Komissiya a’zolarining g‘oliblarni aniqlash bo‘yicha qarorlari va xulosalari qayta ko‘rib chiqilmaydi hamda muhokama qilinmaydi.
        </p>
      </>
    ),
  }
  
];

const Nizom: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  return (
    <section className="">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#F7FAFF] text-gray-900 py-10 ">
        <div className="w-full mx-auto px-4 nizom-header custom-container">
          {/* Header */}
          <h1 className=" md:text-3xl text-[#012840] lg:text-[32px] text-[28px] text-center md:text-start font-semibold mb-6">Genius Cup Nizom</h1>

          {/* Nizom Matni */}
          <div className="space-y-4 text-[16px] leading-relaxed">


           <p className="text-[16px] text-[#01284099] poppin">Mazkur Nizom Osiyo Texnologiyalar universitetining innovatsion tashabbusi sifatida respublikamizning barcha umumiy o‘rta ta’lim maktab o‘quvchilari, akademik litsey va kasbiy ta’lim muassasalari talabalari orasidan iqtidorli, bilimdon va yaratuvchan yoshlarga e’tibor qaratgan holda, ularni oliy ta’limga keng jalb etish hamda kelajakdagi muvaffaqiyatga yo‘l ochish maqsadida tashkil etayotgan “Genius-Cup” onlayn IQ musobaqasining tashkil etish tartibini belgilaydi.
           Imtihonlarda O‘zbekiston Respublikasidagi barcha umumiy o‘rta ta’lim maktablarining 3-11 sinf o‘quvchilari hamda akademik litsey va kasbiy ta’lim muassasalarining 1-2 bosqich talabalari ishtirok etishi mumkin.</p>
          </div>
        </div>
      </motion.div>

      {/* Bob tugmalari */}
      <div className="max-w-4xl mx-auto px-4 my-[68px]">
        <div className="flex space-x-4  pb-3">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`text-lg font-semibold transition ${activeSection === section.id
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"
                }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div className="mt-6 text-lg">
          {sections.find((s) => s.id === activeSection)?.content || <p>Bo‘lim topilmadi</p>}
        </div>
      </div>
    </section>
  );
};

export default Nizom;
