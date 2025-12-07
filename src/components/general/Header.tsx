import { Link } from "react-router";
import { navLinks } from "../../constants/navLinks";
import Chat from "../icons/header/Chat";
import Notifications from "../icons/header/Notifications";
import Profile from "../icons/header/Profile";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Header = () => {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <header className="container py-3 flex items-center justify-between px-4 md:px-10">
        <img src="/images/header/numra_logo.png" className="w-32" />

        <div className="hidden lg:flex items-center gap-6">
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

        <div className="hidden lg:flex items-center gap-6">
          <Chat />
          <Notifications />
          {isAuthenticated() && user ? (
            <Link
              to="/profile"
              className="bg-[#EBAF29] min-w-[180px] h-14 px-4 rounded-[20px] text-[#192540] text-lg font-semibold flex items-center justify-center gap-2"
            >
              <Profile />
              {user.name}
            </Link>
          ) : (
            <Link
              to="/signin"
              className="bg-[#EBAF29] w-[180px] h-14 rounded-[20px] text-[#192540] text-lg font-semibold flex items-center justify-center gap-2"
            >
              <Profile />
              Log In
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-[#192540] text-3xl"
        >
          <Menu />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed top-0 right-0 h-full w-[75%] bg-white shadow-lg z-50 p-6 flex flex-col"
            >
              <button
                className="text-3xl mb-6 text-[#192540]"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>

              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="text-[#192540] text-xl font-semibold hover:text-[#EBAF29] transition"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center justify-center gap-4 mt-8">
                <Chat />
                <Notifications />
              </div>

              {isAuthenticated() && user ? (
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="mt-8 bg-[#EBAF29] w-full py-3 rounded-2xl text-[#192540] text-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Profile />
                  {user.name}
                </Link>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setOpen(false)}
                  className="mt-8 bg-[#EBAF29] w-full py-3 rounded-2xl text-[#192540] text-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Profile />
                  Log In
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
