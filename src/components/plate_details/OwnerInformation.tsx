import { Link } from "react-router"
import Chat from "../icons/plates/Chat"
import Phone from "../icons/plates/Phone"
import Verified from "../icons/plates/Verified"
import Whatsapp from "../icons/plates/Whatsapp"

const OwnerInformation = () => {
    return (
        <section className="container md:py-[58px] py-10">
            <h2 className="text-[#192540] text-[32px] font-medium">Owner Information</h2>
            <Link to='/seller_profile' className="mt-9 flex flex-wrap justify-between">
                <div className="flex gap-3">
                    <img
                        src="/images/plates/owner_img.jpg"
                        alt="owner image"
                        className="w-[78px] h-[78px] rounded-full"
                    />
                    <div>
                        <h2 className="text-[#192540] text-2xl font-medium">Ahmad Mohamed</h2>
                        <p className="text-[#717171] text-base font-medium mt-2">Premium Dealer</p>
                        <p className="text-[#717171] text-base font-medium">Member since 2019</p>
                    </div>
                </div>

                <Verified />

                <div className="flex flex-wrap justify-center items-center gap-6 mt-4 lg:mt-0">
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
            </Link>
        </section>
    )
}

export default OwnerInformation
