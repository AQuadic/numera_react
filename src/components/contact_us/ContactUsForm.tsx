import Email from "../icons/contact/Email"
import Facebook from "../icons/contact/Facebook"
import Phone from "../icons/contact/Phone"
import X from "../icons/contact/X"
import Instagram from "../icons/footer/Instagram"
import Whatsapp from "../icons/footer/Whatsapp"

const ContactUsForm = () => {
    return (
        <section className="container w-full h-[737px] lg:bg-[#FFFAEF] rounded-[42px] md:my-14 px-8 py-10 relative">
            <h2 className="text-[#192540] text-[32px] font-medium">Contact Support</h2>
            <p className="text-[#717171] text-xl font-medium mt-4">We’re here to help! Send us your questions or issues, and we’ll respond as <br /> soon as possible.</p>

            <div className="flex items-center justify-between">
                <form className="mt-10 w-full">
                <div className="flex flex-col">
                    <label 
                        htmlFor="name" 
                        className="text-[#192540] text-xl font-medium"
                    >
                        Name
                    </label>
                    <input 
                        type="text" 
                        className="lg:w-[760px] w-full h-14 border border-[#D9D9D9] rounded-md mt-3 px-3"
                        placeholder="Enter your name"
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
                        type="text" 
                        className="lg:w-[760px] w-full h-14 border border-[#D9D9D9] rounded-md mt-3 px-3"
                        placeholder="Enter your email"
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
                        className="lg:w-[760px] w-full h-[143px] border border-[#D9D9D9] rounded-md mt-3 p-3"
                        placeholder="Enter your message"
                    />
                </div>

                <button className="lg:w-[760px] w-full h-14 bg-[#EBAF29] rounded-md mt-6 text-[#192540] text-lg font-semibold cursor-pointer">
                    Send Message
                </button>
            </form>

            <div className="w-[336px] h-[432px] bg-[#F8EBD0] rounded-[42px] px-6 py-14 absolute -right-20 lg:block hidden">
                <h2 className="text-[#192540] text-2xl font-medium">Get in Touch</h2>
                <div className="flex items-center gap-3 mt-10">
                    <Phone />
                    <div>
                        <p className="text-[#192540] text-base font-medium">Phone Number</p>
                        <a href="https://wa.me/+971 586144848" className="text-[#192540] text-xl font-medium">
                            +971 586144848
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-6">
                    <Email />
                    <div>
                        <p className="text-[#192540] text-base font-medium">Email</p>
                        <a href="https://wa.me/+971 586144848" className="text-[#192540] text-xl font-medium">
                            Numra@gmail.com
                        </a>
                    </div>
                </div>

                <div className="w-full h-px mt-8 border-t border-dashed border-[#A6A6A6]"></div>

                <h2 className="text-[#192540] text-base font-medium mt-8">Connect With Us</h2>

                <div className="flex items-center gap-6 mt-4">
                    <Facebook />
                    <Whatsapp />
                    <Instagram />
                    <X />
                </div>
            </div>
            </div>
        </section>
    )
}

export default ContactUsForm
