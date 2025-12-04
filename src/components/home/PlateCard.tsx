import { Link } from "react-router"
import Heart from "../icons/home/Heart"

const PlateCard = () => {
    return (
        <Link to='/plate_details' className="md:w-[282px] w-full rounded-lg bg-[#F0F0F0] py-6 px-2">
            <div className="flex items-center justify-between">
                <div className="w-[93px] h-[30px] bg-[#CFEAD6] rounded-md text-[#1E7634] font-medium flex items-center justify-center">
                    Best Deal
                </div>
                <Heart />
            </div>
            <img 
                src="/images/plates/plate_image.png"
                alt="Plate image"
                className="mt-6"
            />

            <div className="mt-6 flex items-center justify-between">
                <p className="text-[#717171] md:text-sm text-xs font-medium">Category : <span>Premium</span></p>
                <p className="text-[#1E7634] md:text-sm text-xs font-medium">Available</p>
            </div>

            <h2 className="text-[#192540] md:text-lg font-medium mt-3">VIP Lucky Numbers</h2>

            <div className="mt-3 flex items-center justify-between">
                <h2 className="text-[#192540] md:text-xl text-xs font-semibold">
                85,000 <span className="md:text-sm text-xs relative md:top-1">AED</span>
                </h2>

                <div className="w-[147px] h-12 bg-[#EBAF29] rounded-[10px] text-[#192540] text-base font-semibold flex items-center justify-center">
                    View Details
                </div>
            </div>
        </Link>
    )
}

export default PlateCard
