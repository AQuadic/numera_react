import Heart from "../icons/home/Heart"
import Share from "../icons/plates/Share"

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

            <button className="w-full h-14 bg-[#EBAF29] rounded-md mt-6 text-[#192540] text-lg font-semibold">
                Price on Request
            </button>
        </section>
    )
}

export default PhoneNumDetailsHeader
