import Filter from "../icons/home/Filter"
import Search from "../icons/home/Search"
import PlateCard from "./PlateCard"

const FilterYourPlates = () => {
    return (
        <div className="container md:py-[58px] py-10">
            <div className="flex flex-wrap items-center justify-between">
                <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">Filter Your Plates</h2>

                <div className="flex items-center gap-6 mt-2 lg:mt-0">
                    <div className="relative">
                        <input 
                            type="text"
                            className="lg:w-[384px] w-full h-14 border border-[#F0F0F0] rounded-md px-12"
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
            </div>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-6">
                {[...Array(8)].map((_, index) => (
                    <PlateCard key={index} />
                ))}
            </div>
        </div>
    )
}

export default FilterYourPlates
