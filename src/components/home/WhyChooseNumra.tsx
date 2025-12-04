
const WhyChooseNumra = () => {
    return (
        <section className="container md:py-[58px] py-10">
            <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">Why Choose <span className="text-[#B48110]">Numra</span></h2>

            <div className="md:mt-20 mt-5 flex flex-wrap items-center justify-between gap-8">
                <div className="relative">
                    <img src="/images/home/1.png" alt="1" className="md:block hidden absolute -left-16 top-0 text-[240px] font-bold text-[#F0F0F0] select-none -z-10"/>
                    <img src="/images/home/QuickActionIcon.svg" alt="icon" className="relative z-10" />
                    <h2 className="text-[#192540] md:text-2xl text-xl font-semibold mt-1">Ease of use at every step</h2>
                    <p className="w-[315px] text-[#717171] text-sm font-medium mt-3">We provide you with a smooth and effortless experience that allows you to get things done quickly and without complications.</p>
                </div>

                <div className="relative">
                    <img src="/images/home/2.png" alt="2" className="md:block hidden absolute -left-16 top-0 text-[240px] font-bold text-[#F0F0F0] select-none -z-10"/>
                    <img src="/images/home/CustomerSupportIcon.svg" alt="icon" className="relative z-10" />
                    <h2 className="text-[#192540] md:text-2xl text-xl font-semibold mt-1">We're here whenever you need us</h2>
                    <p className="w-[315px] text-[#717171] text-sm font-medium mt-3">Our customer support team is ready to <br /> assist you anytime, 24/7.</p>
                </div>

                <div className="relative">
                    <img src="/images/home/3.png" alt="3" className="md:block hidden absolute -left-16 top-0 text-[240px] font-bold text-[#F0F0F0] select-none -z-10"/>
                    <img src="/images/home/PrivacyIcon.svg" alt="icon" className="relative z-10" />
                    <h2 className="text-[#192540] md:text-2xl text-xl font-semibold mt-1">Your privacy is our responsibility</h2>
                    <p className="w-[315px] text-[#717171] text-sm font-medium mt-3">We are committed to the highest standards of <br /> protection to keep your personal data <br /> completely secure.</p>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseNumra
