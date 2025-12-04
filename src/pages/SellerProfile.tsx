import HomeCategories from "../components/home/HomeCategories"
import WhyChooseNumra from "../components/home/WhyChooseNumra"
import Filter from "../components/icons/home/Filter"
import Search from "../components/icons/home/Search"
import Chat from "../components/icons/plates/Chat"
import Phone from "../components/icons/plates/Phone"
import Verified from "../components/icons/plates/Verified"
import Whatsapp from "../components/icons/plates/Whatsapp"

const SellerProfile = () => {
    return (
        <section className="container md:py-[58px]">
            <div className="flex items-center gap-6">
                <div className="relative">
                        <input 
                            type="text"
                            className="lg:w-[996px] w-full h-14 border border-[#F0F0F0] rounded-md px-12"
                            placeholder="Search"
                        />
                        <div className="absolute top-4 left-4">
                            <Search />
                        </div>
                    </div>

                <div className="lg:w-[180px] w-full h-14 border border-[#F0F0F0] rounded-md flex items-center justify-center gap-3">
                    <p className="text-[#717171] font-semibold">Filter</p>
                    <Filter />
                </div>
            </div>

            <div className="mt-[58px] w-full p-6 bg-[#F0F0F0] rounded-md flex flex-col items-center justify-center">
                <img 
                    src="/images/plates/owner_img.jpg"
                    alt="owner image"
                    className="w-[167px] h-[167px] rounded-full"
                />
                <div className="mt-4 flex items-center gap-3">
                    <h2 className="text-[#192540] text-2xl font-medium">Ahmed Mohamed</h2>
                    <Verified />
                </div>

                <p className="text-[#717171] text-base font-medium mt-2">Premium Dealer</p>
                <p className="text-[#717171] text-base font-medium mt-1">Member since 2019</p>

                <div className="flex flex-wrap justify-center items-center gap-6 mt-4 lg:mt-6">
                    <div className="w-[180px] h-[102px] bg-[#192540] rounded-[10px] flex flex-col items-center justify-center gap-2">
                        <Phone />
                        <p className="text-[#FEFEFE] text-xl font-medium">Call</p>
                    </div>

                    <div className="w-[180px] h-[102px] bg-[#EBAF29] rounded-[10px] flex flex-col items-center justify-center gap-2">
                        <Chat />
                        <p className="text-[#192540] text-xl font-medium">Chat</p>
                    </div>

                    <div className="w-[180px] h-[102px] bg-[#19AA3D] rounded-[10px] flex flex-col items-center justify-center gap-2">
                        <Whatsapp />
                        <p className="text-[#FEFEFE] text-xl font-medium">WhatsApp</p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-6 mt-4 lg:mt-6">
                    <div className="w-[180px] h-[75px] bg-[#FEFEFE] rounded-[10px] flex flex-col items-center justify-center gap-1">
                        <p className="text-[#192540] text-xl font-medium">1.300</p>
                        <p className="text-[#717171] text-base font-medium">Total Plates</p>
                    </div>

                    <div className="w-[180px] h-[75px] bg-[#FEFEFE] rounded-[10px] flex flex-col items-center justify-center gap-1">
                        <p className="text-[#EBAF29] text-xl font-medium">89</p>
                        <p className="text-[#717171] text-base font-medium">Premium</p>
                    </div>

                    <div className="w-[180px] h-[75px] bg-[#FEFEFE] rounded-[10px] flex flex-col items-center justify-center gap-1">
                        <p className="text-[#192540] text-xl font-medium">156</p>
                        <p className="text-[#717171] text-base font-medium">Sold</p>
                    </div>
                </div>

            </div>

            <HomeCategories />
            <WhyChooseNumra />
        </section>
    )
}

export default SellerProfile
