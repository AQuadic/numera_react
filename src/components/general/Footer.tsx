import { Link } from "react-router"
import { navLinks } from "../../constants/navLinks"
import Whatsapp from "../icons/footer/Whatsapp"
import Instagram from "../icons/footer/Instagram"
import Facebook from "../icons/footer/Facebook"

const Footer = () => {
    return (
        <footer className="bg-[#EBAF29] py-[58px]">
            <div className="container">
                <div className="flex flex-wrap justify-between">

                <div>
                    <img src="/images/header/numra_logo.png" alt="log"/>
                    <p className="text-[#192540] font-medium mt-3">Your trusted platform to buy and <br /> sell custom car plates.</p>
                </div>

                <div>
                    <h2 className="text-[#192540] text-xl font-semibold">Company</h2>
                    <div className="flex flex-col gap-4 mt-4">
                        {navLinks.map((link) => (
                        <Link
                        key={link.title}
                        to={link.href}
                        className="text-[#192540] text-lg font-medium hover:text-[#EBAF29] transition"
                        >
                        {link.title}
                        </Link>
                    ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-[#192540] text-xl font-semibold">Contact Us</h2>
                    <a
                        href="https://wa.me/201236547896"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 mt-4"
                        >
                        <Whatsapp />
                        <p className="text-[#192540] text-base">+201236547896</p>
                    </a>
                </div>

                <div>
                    <h2 className="text-[#192540] text-xl font-semibold">Subscribe</h2>
                    <p className="md:w-[379px] w-full text-[#4A4949] text-base leading-[150%] mt-3">Subscribe to get the latest updates, fitness tips, and exclusive offers — straight to your inbox.</p>
                    <div className="mt-4 relative">
                        <input 
                            type="text"
                            className="md:w-[379px] w-full h-14 border border-[#192540] rounded-2xl px-4 placeholder:text-[#4A4949] "
                            placeholder="Write your email"
                        />
                        <button className="w-[103px] h-14 bg-[#192540] rounded-tr-2xl rounded-br-2xl absolute right-0">
                            <p className="text-[#EBAF29] text-lg font-bold">Send</p>
                        </button>
                    </div>
                </div>
                </div>

            <div className="w-full h-px mt-14 border-t border-dashed border-[#FEFEFE80]"></div>

            <div className="flex items-center justify-center gap-4 mt-1">
                <h2 className="text-[#192540] text-xl font-medium">Follow Us</h2>
                <div className="flex items-center gap-2">
                    <Whatsapp />
                    <Instagram />
                    <Facebook />
                </div>
            </div>
            </div>
        </footer>
    )
}

export default Footer
