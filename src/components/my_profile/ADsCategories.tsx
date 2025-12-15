import { Link } from "react-router"
import Bike from "../icons/home/Bike"
import Car from "../icons/home/Car"
import Phone from "../icons/home/Phone"

const ADsCategories = () => {
    return (
        <div className="md:py-20">
            <h2 className="text-[#192540] text-2xl font-medium">ADs Categories</h2>

            <div className="mt-6 flex gap-6">
                <Link to='/profile/allAds' className="w-full h-[310px] rounded-md bg-[#ECEDEF] flex flex-col items-center justify-center gap-3">
                    <Car />
                    <p className="text-[#192540] text-2xl font-semibold">Cars Plates</p>
                </Link>
                <div className="flex flex-col gap-10 w-full">
                    <Link to='/profile/allAds' className="w-full h-[135px] rounded-md bg-[#FCF8ED] flex flex-col items-center justify-center gap-3">
                        <Bike />
                        <p className="text-[#966A08] text-2xl font-semibold">Fun & Motorcycle</p>
                    </Link>
                    <Link to='/profile/allAds' className="w-full h-[135px] rounded-md bg-[#F1FCEE] flex flex-col items-center justify-center gap-3">
                        <Phone />
                        <p className="text-[#154D23] text-2xl font-semibold">Phone Numbers</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ADsCategories
