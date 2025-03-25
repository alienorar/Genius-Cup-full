import React, { useState } from "react";

const sections = [
  {
    id: "1",
    title: "I bob.",
    content: (
      <>
        <h2 className="text-[20px] font-semibold poppin">
          Olimpiadaning asosiy maqsadi va vazifalari
        </h2>
        <p className="poppin text-[16px] text-[#012840]">
          <strong>8.</strong> Olimpiada O‘zbekiston Respublikasi Prezidentining 2023 yil 11 sentyabdagi
          ““O‘zbekiston – 2030” strategiyasi to‘g‘risida”gi PF-158-soni Farmoni hamda O‘zbekiston Respublikasi
          Prezidentining 2020 yil 7 maydagi “Matematika sohasidagi ta’lim sifatini oshirish va ilmiy-tadqiqotlarni
          rivojlantirish chora-tadbirlari to‘g‘risida”gi PQ-4708-son qarorida belgilangan vazifalar ijrosini ta’minlash;
          9. Xalqaro olimpiadaning asosiy maqsadi – o‘quvchilarning ijodiy qobiliyatlari, ilmiy-tadqiqot faoliyatiga
          qiziqishini oshirish, iqtidorli bolalarni qo‘llab-quvvatlash va ularning intellektual rivojlanishi uchun zarur
          shart-sharoitlar yaratishdan iborat.
          10. Maqsadni amalga oshirish uchun qo‘yilgan vazifalar: ta’lim tashkilotlarining o‘quvchilari orasidan
          matematika fani bo‘yicha bilimli, ushbu fanga qiziquvchi, intiluvchan va ijodkor yoshlarni aniqlash, ulardaning
          tanqidiy-tahlil, ijodiy qobiliyatlarini ruyobga chiqarishlariga ko‘maklashish, qo‘llab-quvvatlash va rag‘batlantirish;
          11. Olimpiadaning ikkinchi va uchinchi bosqichida muvaffaqiyatli ishtirok etib (10-11-sinflar uchun), g‘oliblikni
          qo‘lga kiritgan o‘quvchilarni Xalqaro Nordik universitetiga (keyingi o‘rinlarda Universitet) imtiyozli qabul qilish,
          kichik yoshdagi iqtidorli o‘quvchilarni Universitet va “IDC” nodavlat ta’lim markazi bilan hamkorlikda tizimli ravishda
          masofaviy ta’lim berish orqali matematik bilimlarini chuqurlashtirish, quyi sinf o‘quvchilarini yoshligidan ilm-fanga yo‘naltirish;
          12. Xalqaro (International Advanced Levels) dasturlar talablariga muvofiq o‘quvchilarning STEAM fanlari bo‘yicha bilim
          va ko‘nikmalarini oshirishga ko‘maklashish;
          13. Matematika fanini o‘quvchilar orasida keng yoyish, yoshlar orasida “Bilim insonni ulug‘laydi”, “Intilganga tole yor”
          shiorlari ostida targ‘ibot ishlarini tashkil etish, g‘oliblarning erishgan yutuqlarini keng jamoatchilikka yetkazishdan iborat.
        </p>
      </>
    ),
  },
  {
    id: "2",
    title: "II bob.",
    content: (
      <>
        <p>
          <strong>2.</strong> Ushbu Nizomda quyidagi asosiy tushunchalar qo‘llaniladi:
        </p>
        <ul className="list-disc pl-6 text-[#01284099]">
          <li>
            Olimpiada — umumta’lim fanlari bo‘yicha Xalqaro Nordik universiteti va “IDC” nodavlat ta’lim muassasasi tomonidan
            tashkil etiladigan musobaqa;
          </li>
          <li>
            Onlayn olimpiada – faqat axborot texnologiyalari (kompyuter, planshet, telefon) orqali o‘tkaziladi.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "3",
    title: "III bob.",
    content: (
      <>
        <p>
          <strong>3.</strong> Olimpiada yagona ilmiy-uslubiy yondashuv asosida adolatlilik, ochiqlik va shaffoflik tamoyillari asosida
          o‘tkaziladi.
        </p>
      </>
    ),
  },
];

const Nizom: React.FC = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  return (
    <section>
      <div className="bg-[#F7FAFF] text-gray-900 lg:py-16 relative">
        <div className="custom-container">
          {/* Header */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Genius Cup Nizom
          </h1>

          {/* Nizom Matni */}
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              <strong>1.</strong> Mazkur Nizom umumiy o‘rta ta’lim tashkilotlari, akademik litsey va kasb-hunar maktablari
              o‘quvchilari o‘rtasida Matematika fanidan Toshkent xalqaro matematika olimpiadasining (Tashkent International Mathematical Olympiad, TIMO)
              – keyingi o‘rinlarda Olimpiada) hududiy-saralash, respublika va xalqaro bosqichini (uch bosqichli) o‘tkazish tartibini belgilaydi.
            </p>
            <p>
              <strong>2.</strong> Ushbu Nizomda quyidagi asosiy tushunchalar qo‘llaniladi:
            </p>
            <ul className="list-disc pl-6">
              <li>
                Olimpiada — umumta’lim fanlari bo‘yicha Xalqaro Nordik universiteti, “IDC” nodavlat ta’lim muassasasi tomonidan
                O‘zbekiston Respublikasi Maktabgacha va maktab ta’limi vazirligi (keyingi o‘rinlarda – Vazirlik), xalqaro tashkilotlar
                ko‘magida respublika miqyosida va xorijiy mamlakatlar maktablari o‘rtasida tizimli ravishda har yili tashkil etiladigan olimpiada;
              </li>
              <li>
                onlayn olimpiada – o‘quvchilarning bilimlarini onlayn tarzda sinovdan o‘tkazish va faqat axborot texnologiyalari (kompyuter,
                planshet, telefon va boshqalar) orqali amalga oshiriladigan imtihon;
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="custom-container mt-5">
        {/* Navigation (Bob tugmalari) */}
        <div className="flex space-x-4 border-b pb-3">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`text-lg font-semibold ${
                activeSection === section.id ? "text-black border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div className="mt-6 text-lg">
          {sections.find((s) => s.id === activeSection)?.content}
        </div>
      </div>
    </section>
  );
};

export default Nizom;
