import Heart from "../icons/home/Heart"
import Share from "../icons/plates/Share"

const PlateDetailsHeader = () => {
    return (
        <section className="container md:py-[58px]">
            <div className="flex flex-wrap gap-6">
                <img 
                    src="/images/plates/plate_details.jpg" 
                    alt="plate details"
                    className="md:w-[486px] w-full h-[287px] object-cover rounded-md"
                />
                <div className="flex items-start justify-between flex-1">
                    <div>
                        <h2 className="text-[#192540] md:text-[40px] text-2xl font-medium">Premium Dubai Plate</h2>
                        <h2 className="text-[#966A08] md:text-2xl font-bold mt-3">
                            85,000 <span className="text-sm relative top-1">AED</span>
                        </h2>
                        <h3 className="text-[#192540] md:text-base font-medium mt-5">Plate Details</h3>
                        <p className="text-[#717171] md:text-lg font-medium mt-5">
                            Plate Number : <span className="text-[#192540] md:text-xl">QR 2025</span>
                        </p>

                        <p className="text-[#717171] md:text-lg font-medium mt-4">
                            Emirate : <span className="text-[#192540] md:text-xl">Abu Dhabi</span>
                        </p>

                        <p className="text-[#717171] md:text-lg font-medium mt-4">
                            Listed Date : <span className="text-[#192540] md:text-xl">2 days ago</span>
                        </p>
                    </div>

                    <div className="flex items-center md:gap-8">
                        <Share />
                        <Heart />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PlateDetailsHeader
