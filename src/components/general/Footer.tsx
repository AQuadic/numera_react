import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { navLinks } from "../../constants/navLinks";
import Whatsapp from "../icons/footer/Whatsapp";
import Instagram from "../icons/footer/Instagram";
import Facebook from "../icons/footer/Facebook";
import { getPages, type Page } from "../../lib/api/pages/getPages";
import Spinner from "../icons/general/Spinner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import DownloadApp from "./DownloadApp";
import { getSocials, type SocialLinks } from "../../lib/api/getSocials";
import Snapchat from "../icons/footer/Snapchat";
import Tiktok from "../icons/footer/Tiktok";
import LinkedIn from "../icons/footer/LinkedIn";
import Youtube from "../icons/footer/Youtube";
import X from "../icons/footer/X";
import { postSubscribe } from "../../lib/api/subscribe";
import toast from "react-hot-toast";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: pages, isLoading } = useQuery<Page[]>({
    queryKey: ["pages"],
    queryFn: getPages,
  });

    const { data: socials } = useQuery<SocialLinks, Error>({
        queryKey: ["socials"],
        queryFn: getSocials,
    });

    const handleSubscribe = async () => {
        if (!email) return toast.error("Email is required");

        setLoading(true);
        try {
        const response = await postSubscribe({ email });
            toast.dismiss()
            toast.success(response.message);
            setEmail("");
        } catch (error: any) {
            toast.dismiss();
            toast.error(error.message || "Something went wrong");
            } finally {
            setLoading(false);
        }
    };


    return (
        <footer className="bg-[#EBAF29] py-[58px]">
            <div className="container">
                <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between">

                <div className="">
                    <img src="/images/header/numra_logo.png" alt="log" className="mx-auto md:mx-0"/>
                    <p className="text-[#192540] font-medium mt-3 text-center md:text-start">Your trusted platform to buy and <br /> sell custom car plates.</p>
                </div>

                <div>
                    <h2 className="text-[#192540] text-xl font-semibold md:text-start text-center">Company</h2>
                    <div className="flex flex-col items-center md:items-start md:gap-4 gap-2 mt-4">
                    {navLinks.map((link) => {
                        if (link.dialog) {
                        return (
                            <Dialog key={link.title}>
                            <DialogTrigger asChild>
                                <button className="text-[#192540] text-lg font-medium hover:text-[#192540] transition cursor-pointer">
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
                        className="text-[#192540] text-lg font-medium"
                        >
                        {link.title}
                        </Link>
                    )})}

                    <div className="flex flex-col items-center md:items-start md:gap-4 gap-2">
                        {isLoading && <Spinner />}
                        {pages?.map((page) => (
                        <Link
                            key={page.id}
                            to={`/page/${page.id}`}
                            className="text-[#192540] text-lg font-medium"
                        >
                            {page.title.en}
                        </Link>
                        ))}
                    </div>
                    </div>
                </div>

                <div className="md:mt-0 mt-4">
                    <h2 className="text-[#192540] text-xl font-semibold md:text-start text-center">Contact Us</h2>
                    {socials?.phone && (
                        <a
                            href={`tel:${socials.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex md:justify-start justify-center gap-2 mt-4"
                            >
                            <Whatsapp />
                            <p className="text-[#192540] text-base">{socials.phone}</p>
                        </a>
                    )}
                </div>

                <div className="md:mt-0 mt-4">
                    <h2 className="text-[#192540] text-xl font-semibold md:text-start text-center">Subscribe</h2>
                    <p className="md:w-[379px] w-full text-[#4A4949] text-base leading-[150%] mt-3">Subscribe to get the latest updates, fitness tips, and exclusive offers — straight to your inbox.</p>
                    <div className="mt-4 relative">
                        <input 
                            type="text"
                            className="lg:w-[379px] w-full h-14 border border-[#192540] rounded-2xl px-4 placeholder:text-[#4A4949] "
                            placeholder="Write your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        <button
                        onClick={handleSubscribe}
                        className={`w-[103px] h-14 bg-[#192540] rounded-tr-2xl rounded-br-2xl absolute right-0 xl:-right-17 lg:right-28 md:top-0 
                            ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                        disabled={loading} 
                        >
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-[#EBAF29] text-lg font-bold">sending ...</p>
                            </div>
                        ) : (
                            <p className="text-[#EBAF29] text-lg font-bold">Send</p>
                        )}
                        </button>
                    </div>
                </div>
                </div>

            <div className="w-full h-px mt-14 border-t border-dashed border-[#FEFEFE80]"></div>

            <div className="flex flex-wrap items-center justify-center md:gap-4 gap-2 mt-1">
                <h2 className="text-[#192540] text-xl font-medium">Follow Us</h2>
                <div className="flex items-center gap-2">
                    {socials?.facebook && (
                        <a href={socials.facebook} target="_blank" rel="noreferrer">
                        <Facebook />
                        </a>
                    )}
                    {socials?.whatsapp && (
                        <a href={`https://wa.me/${socials.whatsapp}`} target="_blank" rel="noreferrer">
                        <Whatsapp />
                        </a>
                    )}
                    {socials?.instagram && (
                        <a href={socials.instagram} target="_blank" rel="noreferrer">
                        <Instagram />
                        </a>
                    )}
                    {socials?.snapchat && (
                        <a href={socials.snapchat} target="_blank" rel="noreferrer">
                        <Snapchat />
                        </a>
                    )}
                    {socials?.tiktok && (
                        <a href={socials.tiktok} target="_blank" rel="noreferrer">
                        <Tiktok />
                        </a>
                    )}
                    {socials?.linkedin && (
                        <a href={socials.linkedin} target="_blank" rel="noreferrer">
                        <LinkedIn />
                        </a>
                    )}
                    {socials?.youtube && (
                        <a href={socials.youtube} target="_blank" rel="noreferrer">
                        <Youtube />
                        </a>
                    )}
                    {socials?.twitter && (
                        <a href={socials.twitter} target="_blank" rel="noreferrer">
                        <X />
                        </a>
                    )}
                    </div>
            </div>
            </div>
        </footer>
    )
}

export default Footer
