import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import BlueLogo from "../../assets/logo-blue.svg";

const Header = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Sovrin", path: "/sovrin" },
        { name: "Savollar", path: "/savollar" },
        { name: "Bog‘lanish", path: "/boglanish" },
        { name: "Maqolalar", path: "/maqolalar" },
        { name: "Nizom", path: "/nizom" },
    ];

    return (
        <header className="custom-container">
            <nav className="flex items-center justify-between md:py-[30px] py-[20px] relative">
                <Link to={"/"}>
                    <img src={BlueLogo} alt="blue logo" />
                </Link>

                {/* Mobile Menu Button */}
                <button className="lg:hidden text-2xl text-[#1E9FD9]" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <HiX className="text-[#1E9FD9]" /> : <HiMenuAlt1 className="text-[#1E9FD9]" />}
                </button>

                <div className="hidden lg:flex items-center gap-[50px]">
                    <ul className="flex gap-6 items-center text-zinc-400 text-lg font-medium poppins">
                        {navLinks.map((link) => (
                            <li key={link.name} className="relative">
                                <Link
                                    to={link.path}
                                    className={`relative px-2 py-1 transition duration-300 hover:text-black poppin ${location.pathname === link.path ? "font-semibold text-black" : "text-zinc-500"}`}
                                >
                                    {link.name}
                                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button className="relative h-12 w-40 overflow-hidden border bg-gradient-to-br rounded-[30px] from-sky-400 to-purple-700 text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                        <a href="https://t.me/Genius_cup_bot" target="_blank" rel="noopener noreferrer" className="relative z-10">
                            Ro'yxatdan O'tish
                        </a>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 right-0 w-[360px] h-full bg-white flex flex-col items-center gap-6 py-10 lg:hidden z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={() => setIsOpen(false)}
                >
                    <button className="absolute top-5 right-5 text-2xl" onClick={() => setIsOpen(false)}>
                        <HiX />
                    </button>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-lg font-medium transition duration-300 hover:text-black poppin ${location.pathname === link.path ? "font-semibold text-black" : "text-zinc-500"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(false);
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a href="https://t.me/Genius_cup_bot" target="_blank" rel="noopener noreferrer" className="text-white bg-gradient-to-br from-sky-400 to-purple-700 rounded-[30px] px-6 py-2">
                        Ro'yxatdan O'tish
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
