import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import FAQHeader from "./faq-header"; 
import { FiChevronDown } from "react-icons/fi"; 
import ChatImg from "../../assets/chat.svg"

const faqData = {
  general: [
    { question: "Is there a free trial available?", answer: "Yes, we offer a 7-day free trial." },
    { question: "Can I change my plan later?", answer: "Yes, you can upgrade or downgrade anytime." },
    { question: "What is your connectivity policy?", answer: "We ensure 99.9% uptime for our services." },
    { question: "How does billing work?", answer: "Billing is done on a monthly basis." },
    { question: "How do I change my Email account?", answer: "You can update your email in the settings." },
  ],
  pricing: [
    { question: "What payment methods do you accept?", answer: "We accept credit cards and PayPal." },
    { question: "Is there a refund policy?", answer: "Yes, we have a 30-day refund policy." },
    { question: "Do you offer discounts for teams?", answer: "Yes, we provide team-based discounts." },
  ],
  about: [
    { question: "Where is your company located?", answer: "We are based in San Francisco, CA." },
    { question: "How can I contact support?", answer: "You can reach us via email or live chat." },
    { question: "Do you have a mobile app?", answer: "Yes, we have apps for iOS and Android." },
  ],
};

const FAQSection = () => {
  const { category } = useParams<{ category: keyof typeof faqData }>();
  const navigate = useNavigate();
  const defaultCategory: keyof typeof faqData = (category as keyof typeof faqData) || "general";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Header (o‘zgarmas qismi) */}
      <FAQHeader />

      {/* Dinamik savollar qismi */}
      <div className="flex flex-col items-center mt-10">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {Object.keys(faqData).map((key) => (
            <button
              key={key}
              onClick={() => navigate(`/faq/${key}`)}
              className={`px-4 py-2 text-[18px] font-semibold border rounded-full ${
                defaultCategory === key ? "border-black text-black" : "border-transparent"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <ul className="w-3/4 max-w-lg space-y-4">
          {faqData[defaultCategory].map((item, index) => (
            <li key={index} className=" pb-3">
              <button
                className="flex items-center justify-between  w-full text-left font-medium text-lg py-2"
                onClick={() => toggleFAQ(index)}
              ><div className="flex gap-4 md:gap-5 items-center">
                <span>
                <img src={ChatImg} alt="" />
              </span>
                <span>{item.question}</span>
              </div>
                <span className={`transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}><FiChevronDown /></span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{item.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FAQSection;
