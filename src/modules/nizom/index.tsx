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
        <p className="text-[16px] text-[#01284099] poppin"><strong className="text-black">1.2.</strong>Imtihonlarda O‘zbekiston Respublikasidagi barcha umumiy o‘rta ta’lim maktablarining 3-11 sinf o‘quvchilari hamda akademik litsey va kasbiy ta’lim muassasalarining 1-2 bosqich talabalari ishtirok etishi mumkin.</p>
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


            <ol className="list-decimal pl-6">
              <li>
                Mazkur Nizom umumiy o‘rta ta’lim tashkilotlari, akademik litsey va kasb-hunar maktablari o‘quvchilari o‘rtasida Matematika fanidan Toshkent xalqaro matematika olimpiadasining (Tashkent International Mathematical Olympiad, TIMO – keyingi o‘rinlarda Olimpiada) hududiy-saralash, respublika va xalqaro bosqichini (uch bosqichli) o‘tkazish tartibini belgilaydi.2. Ushbu Nizomda quyidagi asosiy tushunchalar qo‘llaniladi:
              </li>
              <li>. Ushbu Nizomda quyidagi asosiy tushunchalar qo‘llaniladi:olimpiada — umumta’lim fanlari bo‘yicha Xalqaro Nordik universiteti, “IDC” nodavlat ta’lim muassasasi tomonidan O‘zbekiston Respublikasi Maktabgacha va maktab ta’limi vazirligi (keyingi o‘rinlarda – Vazirlik), xalqaro tashkilotlar ko‘magida respublika miqyosida va xorijiy mamlakatlar maktablari o‘rtasida tizimli ravishda har yili tashkil etiladigan olimpiada;onlayn olimpiada — o‘quvchilarning bilimlarini onlayn tarzda sinovdan o‘tkazish va faqat axborot texnologiyalari (kompyuter, planshet, telefon va boshqalar) orqali amalga oshiriladigan olimpiada;olimpiada taqvimi — o‘quv yili davomida o‘tkazilishi rejalashtirilgan matematika fani olimpiadasining reja-jadvali;olimpiada g‘oliblari — respublika darajasida 1, 2, 3-o‘rinlarni, xalqaro darajada oltin, kumush va bronza medallarini qo‘lga kiritgan o‘quvchilar;</li>
              <li> Olimpiada yagona ilmiy-uslubiy yondashuv asosida adolatlilik, ochiqlik va shaffoflik tamoyillari asosida o‘tkaziladi.</li>
              <li>. Olimpiada uchun test topshiriqlari, yozma va amaliy ishlarni (keyingi o‘rinlarda — nazorat materiallari) tayyorlash “IDC” nodavlat ta’lim muassasasi, olimpiadani o‘tkazish bilan bog‘liq tashkiliy tadbirlar Xalqaro Nordik universiteti tomonidan muvofiqlashtiriladi</li>
              <li> Mazkur olimpida tashabbus tartibida tashkil qilinayotganligi bois, Vazirlik bilan kelishgan holda o‘tkaziladi hamda olimpiadalar taqvimiga kiritish uchun yozma xat bilan murojaat qilinadi.</li>
              <li> Olimpiadaning nazorat materiallari o‘quvchilarning bilim, ko‘nikmalarini standart va nostandart masalalarda, amaliy topshiriqlarda qo‘llay olish malakalarini va kompetensiyalarini baholashga qaratiladi.</li>
              <li> O‘quvchilar olimpiadalarda o‘z xohishlariga ko‘ra, ixtiyoriy ravishda qatnashadilar.</li>
            </ol>
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
