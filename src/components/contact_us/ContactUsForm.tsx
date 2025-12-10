import React, { useState } from "react";
import Email from "../icons/contact/Email";
import Facebook from "../icons/contact/Facebook";
import Phone from "../icons/contact/Phone";
import X from "../icons/contact/X";
import Instagram from "../icons/footer/Instagram";
import Whatsapp from "../icons/footer/Whatsapp";
import { createSuggestion, getErrorMessage } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { getSocials, type SocialLinks } from "../../lib/api/getSocials";
import Snapchat from "../icons/footer/Snapchat";
import Tiktok from "../icons/footer/Tiktok";
import LinkedIn from "../icons/footer/LinkedIn";
import Youtube from "../icons/footer/Youtube";

const ContactUsForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: socials } = useQuery<SocialLinks, Error>({
    queryKey: ["socials"],
    queryFn: getSocials,
});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setIsLoading(true);

    try {
      const res = await createSuggestion({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setSuccess(res?.message ?? "Thanks — your message was sent.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container w-full h-[737px] lg:bg-[#FFFAEF] rounded-[42px] md:my-14 px-8 py-10 relative">
      <h2 className="text-[#192540] text-[32px] font-medium">
        Contact Support
      </h2>
      <p className="text-[#717171] text-xl font-medium mt-4">
        We’re here to help! Send us your questions or issues, and we’ll respond
        as <br /> soon as possible.
      </p>

      <div className="flex items-center justify-between">
        <form className="mt-10 w-full" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md lg:w-[760px] w-full">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md lg:w-[760px] w-full">
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-[#192540] text-xl font-medium"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="lg:w-[760px] w-full h-14 border border-[#D9D9D9] rounded-md mt-3 px-3"
              placeholder="Enter your name"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col mt-6">
            <label
              htmlFor="email"
              className="text-[#192540] text-xl font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="lg:w-[760px] w-full h-14 border border-[#D9D9D9] rounded-md mt-3 px-3"
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col mt-6">
            <label
              htmlFor="message"
              className="text-[#192540] text-xl font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="lg:w-[760px] w-full h-[143px] border border-[#D9D9D9] rounded-md mt-3 p-3"
              placeholder="Enter your message"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="lg:w-[760px] w-full h-14 bg-[#EBAF29] rounded-md mt-6 text-[#192540] text-lg font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="w-[336px] h-[432px] bg-[#F8EBD0] rounded-[42px] px-6 py-14 absolute -right-20 lg:block hidden">
          <h2 className="text-[#192540] text-2xl font-medium">Get in Touch</h2>
          <div className="flex items-center gap-3 mt-10">
            <Phone />
            <div>
              <p className="text-[#192540] text-base font-medium">
                Phone Number
              </p>
              {socials?.phone && (
                  <a
                      href={`tel:${socials.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#192540] text-xl font-medium"
                    >
                      <p className="text-[#192540] text-base">{socials.phone}</p>
                  </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <Email />
            <div>
              <p className="text-[#192540] text-base font-medium">Email</p>

              {socials?.email && (
                <a
                  href={`mailto:${socials.email}`}
                  className="text-[#192540] text-xl font-medium"
                >
                  {socials.email}
                </a>
              )}
            </div>
          </div>

          <div className="w-full h-px mt-8 border-t border-dashed border-[#A6A6A6]"></div>

          <h2 className="text-[#192540] text-base font-medium mt-8">
            Connect With Us
          </h2>

          <div className="flex items-center gap-2 mt-2">
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
    </section>
  );
};

export default ContactUsForm;
