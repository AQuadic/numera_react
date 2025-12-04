import Heart from "../icons/home/Heart"
import Call from "../icons/plates/Call"
import DialogWhatsapp from "../icons/plates/DialogWhatsapp"
import Share from "../icons/plates/Share"
import Verified from "../icons/plates/Verified"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

const PhoneNumDetailsHeader = () => {
    return (
        <section className="container md:py-[58px]">
            <div className="w-full h-[427px] bg-[#FDFAF3] rounded-lg p-8">
                <div className="flex items-center justify-between">
                    <h2 className="w-[126px] h-9 rounded-[20px] bg-[#E4FBEA] text-[#1E7634] text-xl font-medium flex items-center justify-center">
                        negotiable 
                    </h2>
                    <div className="flex items-center gap-3">
                        <Share />
                        <Heart />
                    </div>
                </div>
                <div
                    className="w-full h-[73px] flex items-center justify-center text-[24px] font-semibold bg-white border border-[#4A4644] mt-7"
                    style={{
                        borderRadius: "40px / 20px",
                        boxShadow: "inset 4.13px 4.13px 5.9px 0px #e7e7e7"
                    }}
                    >
                    050 123 4567
                </div>

                <h2 className="text-[#192540] text-2xl font-medium mt-8">Number Details</h2>
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-[#717171] md:text-xl font-medium">Operator :</p>
                    <p className="text-[#192540] md:text-2xl font-semibold">QR 2025</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-[#717171] md:text-xl font-medium">Subscription Type :</p>
                    <p className="text-[#192540] md:text-2xl font-semibold">Type</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-[#717171] md:text-xl font-medium">Package :</p>
                    <p className="text-[#192540] md:text-2xl font-semibold">Type</p>
                </div>

            </div>

            <Dialog>
                <DialogTrigger className="w-full">
                    <button className="w-full h-14 bg-[#EBAF29] rounded-md mt-6 text-[#192540] text-lg font-semibold cursor-pointer">
                        Price on Request
                    </button>
                </DialogTrigger>
                <DialogContent className="w-[860px]">
                    <DialogHeader>
                    <DialogTitle className="text-[#192540] text-2xl font-medium">Contact to Get the Price</DialogTitle>
                    <DialogDescription>
                        <div>
                            <div className="w-full h-[102px] bg-[#FDFAF3] rounded-md mt-4 py-3 md:px-6 px-2 flex justify-between">
                                <div className="flex items-center gap-4">
                                    <img 
                                    src="/images/plates/owner_img.jpg"
                                    alt="owner image"
                                    className="w-[78px] h-[78px] rounded-full"
                                    />
                                    <div>
                                        <h2 className="text-[#192540] md:text-2xl font-medium">Ahmed Mohamed</h2>
                                        <p className="text-[#717171] md:text-base font-medium">Premium Dealer</p>
                                        <p className="text-[#717171] md:text-base font-medium">Member since 2019</p>
                                    </div>
                                </div>

                                <Verified />
                            </div>

                            <div className="mt-8">
                                <div className="w-full h-14 bg-[#192540] rounded-[10px] flex items-center justify-center gap-2">
                                    <Call />
                                    <p className="text-[#FEFEFE] text-lg font-medium">Call</p>
                                </div>

                                <div className="w-full h-14 bg-[#19AA3D] rounded-[10px] flex items-center justify-center gap-2 mt-4">
                                    <DialogWhatsapp />
                                    <p className="text-[#FEFEFE] text-lg font-medium">Whatsapp</p>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default PhoneNumDetailsHeader
