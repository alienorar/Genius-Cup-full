import React, { useState } from "react";

const sections = [
  {
    id: "1",
    title: "I bob.",
    content: (
      <>
        <h2 className="text-[20px] font-semibold">
          Olimpiadaning asosiy maqsadi va vazifalari
        </h2>
        <p className="text-[16px] text-[#012840]">
          <strong>8.</strong> Olimpiada O‘zbekiston Respublikasi Prezidentining
          2023 yil 11 sentyabdagi “O‘zbekiston – 2030” strategiyasi to‘g‘risida”gi
          PF-158-soni Farmoni hamda O‘zbekiston Respublikasi Prezidentining 2020 yil
          7 maydagi “Matematika sohasidagi ta’lim sifatini oshirish va ilmiy-tadqiqotlarni
          rivojlantirish chora-tadbirlari to‘g‘risida”gi PQ-4708-son qarorida belgilangan
          vazifalar ijrosini ta’minlash;
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
            Olimpiada — umumta’lim fanlari bo‘yicha Xalqaro Nordik universiteti va “IDC”
            nodavlat ta’lim muassasasi tomonidan tashkil etiladigan musobaqa;
          </li>
          <li>
            Onlayn olimpiada – faqat axborot texnologiyalari (kompyuter, planshet, telefon)
            orqali o‘tkaziladi.
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
          <strong>3.</strong> Olimpiada yagona ilmiy-uslubiy yondashuv asosida adolatlilik,
          ochiqlik va shaffoflik tamoyillari asosida o‘tkaziladi.
        </p>
      </>
    ),
  },
];

const Nizom: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  return (
    <section className="">
      <div className="bg-[#F7FAFF] text-gray-900 py-10 ">
        <div className="w-full mx-auto px-4 nizom-header custom-container">
          {/* Header */}
          <h1 className=" md:text-3xl text-[#012840] lg:text-[32px] text-[28px] font-semibold mb-6">Genius Cup Nizom</h1>

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
      </div>

      {/* Bob tugmalari */}
      <div className="max-w-4xl mx-auto px-4 my-[68px]">
        <div className="flex space-x-4  pb-3">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`text-lg font-semibold transition ${
                activeSection === section.id
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
