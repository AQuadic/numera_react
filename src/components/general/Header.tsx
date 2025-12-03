import { Link } from "react-router";
import { navLinks } from "../../constants/navLinks";
import Chat from "../icons/header/Chat";
import Notifications from "../icons/header/Notifications";
import Profile from "../icons/header/Profile";

const Header = () => {
  return (
    <header className="container py-3 flex items-center justify-center gap-[114px]">
      <img src="/images/header/numra_logo.png" />

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

      <div className="flex items-center gap-6">
        <Chat />
        <Notifications />
        <button className="bg-[#EBAF29] w-[180px] h-14 rounded-[20px] text-[#192540] text-lg font-semibold flex items-center justify-center gap-2 ">
          <Profile />
          Log In
        </button>
      </div>
    </header>
  );
};

export default Header;
