import FaqImg from '../../assets/faq-img.png'

const FAQHeader = () => {
    return (
        <section className='  bg-[#F7FAFF]'>
            <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-8 custom-container">
                {/* Matn qismi */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-[#012840] text-center lg:text-start md:text-[32px] text-[28px] poppin  font-semibold mt-1">
                        Ko‘p beriladigan savollar
                    </h2>
                    <p className="text-[#01284099] mt-4 text-[18px] poppin md:text-base text-center lg:text-start leading-relaxed ">
                        Lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit
                        lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit
                        lorem ipsum dolor sit lorem ipsum dolor
                    </p>
                </div>

                {/* Rasm qismi */}
                <div className="md:w-1/3 flex justify-center">
                    <img src={FaqImg} alt="FAQ" className="w-full max-w-xs md:max-w-md" />
                </div>
            </div>
      </section>
    );
};

export default FAQHeader;
