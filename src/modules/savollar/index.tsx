import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import FAQHeader from "./faq-header";
import { FiChevronDown } from "react-icons/fi";
import ChatImg from "../../assets/chat.svg"

const faqData = {
  umumiy: [
    {
      savol: "Musobaqada kimlar ishtirok etishi mumkin?",
      javob: "O‘zbekistondagi 3–11-sinf o‘quvchilari, akademik litsey va kasb-hunar kollejlari 1–2 bosqich talabalari."
    },
    {
      savol: "Ro‘yxatdan o‘tish qanday amalga oshiriladi?",
      javob: "Telegramdagi <a type='outlined' href='https://t.me/Genius_cup_bot' className='text-[#1E9FD9]' target='_blank'>@Genius_cup_bot</a> yoki <a href='https://t.me/Genius_cup2_bot' target='_blank'>@Genius_cup2_bot</a> orqali ro‘yxatdan o‘tish kerak."
    },
    
    {
      savol: "Test boshlanish sanasi avvaldan qanday tarzda xabar beriladi?",
      javob: "Osiyo texnologiyalar universiteti va musobaqa  rasmiy telegram sahifasida hamda musobaqa telegram botlarida e'lon qilinadi."
    },
    {
      savol: "Testning birinchi (onlayn) bosqichi qachon va qayerda bo‘lib o‘tadi (web-manzil yoki platforma nomi)",
      javob: "20-may kuni <a type='outlined' href='https://t.me/Genius_cup_bot' className='text-[#1E9FD9]' target='_blank'>@Genius_cup_bot</a> yoki <a href='https://t.me/Genius_cup2_bot' target='_blank'>@Genius_cup2_bot</a> orqali bo'lib o'tadi. "
    },
    {
      savol: "Test savollari bilan tanishish uchun namunalar berolasizmi?",
      javob: "Namunalar musobaqa rasmiy telegram sahifasida uzluksiz tarzda berib boriladi. "
    },
    {
      savol: "2-bosqich test musobaqasi o‘tkaziladigan binoga ota-onalardan tashqari uztozlarimizni kelishiga ham ruxsat etiladimi? ",
      javob: "Albatta, ruxsat etiladi ! "
    }
  ],
  qoidalar: [
    {
      savol: "Musobaqa necha bosqichdan iborat?",
      javob: "2 bosqich: onlayn test (10-may) va universitet binosida final."
    },
     {
      savol: "Test qanday baholanadi?",
      javob: "Har bir to‘g‘ri javob 5 ball, maksimum 100 ball. Bir xil ballda testni tezroq tugatgan ishtirokchi ustunlik qiladi."
    },
    {
      savol: "Agar ikki ishtirokchi bir xil ball to‘plasa, kim g‘olib bo‘ladi?",
      javob: "Testni tezroq tugatgan ishtirokchi g‘alaba qozonadi."
    },
    {
      savol: "Musobaqada qanday qoidalar buzilishi taqiqlanadi?",
      javob: "Nizomga zid harakatlar (masalan, botdan noqonuniy foydalanish) diskvalifikatsiyaga olib keladi."
    },
    {
      savol: "Navbatdagi bosqichga o‘tganimni qanday bilaman? ",
      javob: "<a type='outlined' href='https://t.me/Genius_cup_bot' className='text-[#1E9FD9]' target='_blank'>@Genius_cup_bot</a> yoki <a href='https://t.me/Genius_cup2_bot' target='_blank'>@Genius_cup2_bot</a> orqali bilib olsihingiz mumkin."
    }
  ],
  mukofotlar: [
    {
      savol: "Birinchi bosqich g‘oliblari qanday mukofotlanadi?",
      javob: "Sertifikat + 100 000 so‘m pul mukofoti va finalga yo‘llanma."
    },
    {
      savol: "Finalda g‘oliblari nimalar bilan taqdirlanadi?",
      javob: "1-o‘rin: 3 000 000 so‘m, 2-o‘rin: 2 000 000 so‘m, 3-o‘rin: 1 000 000 so‘m. 9–11-sinf top-10 talabasi universitetda 1 yil bepul o‘qish huquqini qo‘lga kiritadi."
    },
    {
      savol: "Eng yuqori natija bilan g‘olib bo‘lgan ishtirokchi, sovrindan tashqari yana qanday imtiyozlarga ega bo‘ladi? ",
      javob: "Ishtirokchilarining eng yuqori ball to‘plagan 10 nafari bir yil imtiyozli tarzda Osiyo  Texnologiyalar universitetida bir yil bepul o‘qish imkoniyatini qo‘lga kiritishadi"
    },
    {
      savol: "Mukofot pullari qanday topshiriladi?",
      javob: "Bank orqali yoki universitet tomonidan belgilangan usulda (plastik karta raqamiga o‘tkazma)."
    }
  ],
};
const FAQSection = () => {
  const { category } = useParams<{ category: keyof typeof faqData }>();
  const navigate = useNavigate();
  const defaultCategory: keyof typeof faqData = (category as keyof typeof faqData) || "umumiy";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Header (o‘zgarmas qismi) */}
      <FAQHeader />

      {/* Dinamik savollar qismi */}
      <div className="flex flex-col items-center mt-10 custom-container">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {Object.keys(faqData).map((key) => (
            <button
              key={key}
              onClick={() => navigate(`/faq/${key}`)}
              className={`md:px-4 px-2 py-1 md:py-2 text-[18px] font-semibold border rounded-full ${defaultCategory === key ? "border-black text-black" : "border-transparent"
                }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <ul className="w-3/4 max-w-lg lg:space-y-4">
          {faqData[defaultCategory]?.map((item, index) => (
            <li key={index} className=" pb-3">
              <button
                className="flex items-center justify-between  w-full text-left font-medium text-lg py-2"
                onClick={() => toggleFAQ(index)}
              ><div className="flex gap-4 md:gap-5 justify-center items-center">
                  <div className="h-8 w-8"  >
                    <img src={ChatImg} alt="chat img " className="object-cover" />
                  </div>
                  <span>{item.savol}</span>
                </div>
                <span className={`transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}><FiChevronDown /></span>
              </button>
              {openIndex === index && (
                <p
                  className="mt-2 text-gray-600"
                  dangerouslySetInnerHTML={{ __html: item.javob }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FAQSection;
