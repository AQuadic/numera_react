import { useState } from "react"
import Filter from "../components/draw_your_plate/Filter"
import WhyChooseNumra from "../components/home/WhyChooseNumra"
import { FilterIcon} from "lucide-react"
import DrawPlatesPattern from "../components/draw_plates/DrawPlatesPattern"

const DrawPlatesPage = () => {
    const [openFilter, setOpenFilter] = useState(false)

    return (
        <div className="md:py-[35px]">
            
            <div className="md:hidden px-4 mb-4">
                <button
                    onClick={() => setOpenFilter(true)}
                    className="bg-[#192540] text-white px-4 py-2 rounded-md"
                >
                    <FilterIcon />
                </button>
            </div>

            <div className="flex gap-6 relative">

                <div
                    className={`
                        fixed top-0 left-0 h-full w-[260px] bg-white z-50
                        transform transition-transform duration-300
                        ${openFilter ? "translate-x-0" : "-translate-x-full"}
                        md:static md:translate-x-0 md:w-[223px] md:block
                    `}
                >
                    <div className="md:hidden flex justify-end p-4">
                        <button
                            onClick={() => setOpenFilter(false)}
                            className="text-[#192540] text-lg font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    <Filter />
                </div>

                {openFilter && (
                    <div
                        onClick={() => setOpenFilter(false)}
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    ></div>
                )}

                <DrawPlatesPattern />
            </div>

            <WhyChooseNumra />
        </div>
    )
}

export default DrawPlatesPage
