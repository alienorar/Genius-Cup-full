import FaqImg from '../../assets/faq-img.png'
import { motion } from "framer-motion";
const FAQHeader = () => {
    return (
        <section className='  bg-[#F7FAFF]'>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-8 custom-container">
                {/* Matn qismi */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-[#012840] text-center lg:text-start md:text-[32px] text-[28px] poppin  font-semibold mt-1">
                        Ko‘p beriladigan savollar
                    </h2>
                    <p className="text-[#01284099] mt-4 text-[18px] poppin md:text-base text-center lg:text-start leading-relaxed ">
                    "Genius Cup musobaqasining savollari orqali mantiqiy fikrlash, tezkor qaror qabul qilish va intellektual qobiliyatingizni sinab ko‘ring. Siz tayyormisiz?"
                    </p>
                </div>

                {/* Rasm qismi */}
                <div className="md:w-1/3 flex justify-center">
                    <img src={FaqImg} alt="FAQ" className="w-full max-w-xs md:max-w-md" />
                </div>
            </motion.div>
        </section>
    );
};

export default FAQHeader;
