import { Link } from "react-router";
import { navLinks } from "../../constants/navLinks";
// import Chat from "../icons/header/Chat";
import Notifications from "../icons/header/Notifications";
import Profile from "../icons/header/Profile";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { 
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "../ui/dialog";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import DownloadApp from "./DownloadApp";
import XIcon from "../icons/header/XIcon";
import Bell from "../icons/header/Bell";
import { useQuery } from "@tanstack/react-query";
import { getBroadcastNotifications } from "../../lib/api/notifications/getNotifications";
import NotificationsEmptyState from "./NotificationsEmptyState";
import Spinner from "../icons/general/Spinner";

const Header = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  // Show the user's name when the store has a user; this avoids relying on a
  // token-only check which can be false when the server uses HttpOnly cookies.
  // AuthProvider hydrates the store before rendering, so user will be available
  // immediately when authenticated.
  const hasUser = !!user;

  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ["broadcastNotifications"],
    queryFn: () => getBroadcastNotifications({pagination: "simple" }),
    enabled: hasUser, 
  });

  const notifications = notificationsData?.data ?? [];

  return (
    <>
      <header className="container py-3 flex items-center justify-between px-4 md:px-10">
        <Link to="/">
          <img
            src="/images/header/numra_logo.png"
            className="w-32"
            alt="Numra logo"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.dialog ? (
                <Dialog key={link.title}>
                  <DialogTrigger asChild>
                    <button className="text-[#192540] text-lg font-medium hover:text-[#EBAF29] transition cursor-pointer">
                      {link.title}
                    </button>
                  </DialogTrigger>

                  <DialogContent className="w-[860px] max-w-full px-0">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription>
                        <DownloadApp />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ) : (
              <Link key={link.title} to={link.href ?? "/"} className="text-[#192540] text-lg font-medium hover:text-[#EBAF29] transition">
                {link.title}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-6">
          {/* <Chat /> */}

          
        </div>

          <div className="flex items-center gap-8">
            {hasUser && (
          <button onClick={() => setNotificationsOpen(true)} className="relative cursor-pointer">
            <Notifications />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#D71F1F]" />
            )}
          </button>
        )}

          <AnimatePresence>
          {notificationsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotificationsOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }} 
                  className="fixed top-0 right-0 h-full w-[360px] bg-white shadow-lg z-50 flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-[#192540] text-xl font-semibold mb-4 p-6">Notifications</h2>
                    <button
                      className="text-3xl mb-6 text-[#192540]"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      <XIcon />
                    </button>
                  </div>

                  <div className="flex-1 flex flex-col gap-3 overflow-y-auto px-2 pb-4">
                    {isLoading && <div className="flex items-center justify-center">
                      <Spinner />
                    </div> }
                    {!isLoading && notifications.length === 0 && <NotificationsEmptyState />}
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between border-b py-4 bg-[#FDFAF3] px-4">
                        <div className="flex items-center gap-2">
                          <Bell />
                          <p className="text-[#192540] text-sm font-medium">{notification.message}</p>
                        </div>
                        <p className="text-[#717171] text-[12px]">
                          {new Date(notification.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-[#192540] text-3xl"
        >
          <Menu />
        </button>
        {hasUser ? (
            <Link
              to="/profile"
              className="bg-[#EBAF29] min-w-[180px] h-14 px-4 rounded-[20px] text-[#192540] text-lg font-semibold hidden lg:flex items-center justify-center gap-2"
            >
              <Profile />
              {user?.name}
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
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="fixed top-0 right-0 h-full w-[75%] bg-white shadow-lg z-50 p-6 flex flex-col"
            >
              <button
                className="text-3xl mb-6 text-[#192540]"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>

              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => {
                  if (link.dialog) {
                    return (
                      <Dialog key={link.title}>
                        <DialogTrigger asChild>
                          <button
                            className="text-[#192540] text-xl font-semibold hover:text-[#EBAF29] transition text-start cursor-pointer"
                            onClick={() => setOpen(false)}
                          >
                            {link.title}
                          </button>
                        </DialogTrigger>

                        <DialogContent className="w-[860px] max-w-full px-0">
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              <DownloadApp />
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    );
                  }

                  return (
                    <Link
                      key={link.title}
                      to={link.href ?? "/"}
                      onClick={() => setOpen(false)}
                      className="text-[#192540] text-xl font-semibold hover:text-[#EBAF29] transition"
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </nav>

              {hasUser ? (
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="mt-8 bg-[#EBAF29] w-full py-3 rounded-2xl text-[#192540] text-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Profile />
                  {user?.name}
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
