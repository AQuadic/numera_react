import { Link } from "react-router"
import { navLinks } from "../../constants/navLinks"

const Header = () => {
    return (
        <header className="container py-3 flex items-center justify-center gap-[114px]">
            <img
                src="/images/header/numra_logo.png"
            />

            <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.title}
                        to={link.href}
                        className="text-[#192540] hover-text-[#EBAF29]"
                    >
                        {link.title}
                    </Link>
                ))}
            </div>
        </header>
    )
}

export default Header
