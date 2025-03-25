import { useParams, useNavigate } from "react-router-dom";
import FAQHeader from "./faq-header"; 


const faqData = {
  general: [
    "Is there a free trial available?",
    "Can I change my plan later?",
    "What is your connectivity policy?",
    "How does billing work?",
    "How do I change my Email account?",
  ],
  pricing: [
    "What payment methods do you accept?",
    "Is there a refund policy?",
    "Do you offer discounts for teams?",
  ],
  about: [
    "Where is your company located?",
    "How can I contact support?",
    "Do you have a mobile app?",
  ],
};

const FAQSection = () => {
  const { category } = useParams<{ category: keyof typeof faqData }>();
  const navigate = useNavigate();

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
              className={`px-4 py-2 text-[18px] font-semibold border rounded-full ${category === key ? "border-black text-black" : "border-transparent"
                }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <ul className="w-3/4 max-w-lg space-y-4">
          {faqData[category || "general"].map((question, index) => (
            <li key={index} className="flex items-center justify-between border-b py-2">
              <span>{question}</span>
              <span>▼</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FAQSection;
