import WhyChooseNumra from "../home/WhyChooseNumra"
import AddPlatesHeader from "./AddPlatesHeader"

const ConfirmPlate = () => {
    return (
        <section className="container">
            <div>
                <AddPlatesHeader />
                <div className="w-full border border-[#F0F0F0] rounded-md p-3">
                    <h2 className="text-[#192540] text-[32px] font-medium">
                        Summary <span className="text-[#717171] text-xl">“Plate#1”</span>
                    </h2>
                    <div className="mt-6 flex items-center justify-between">
                        <h2 className="text-[#192540] text-2xl font-medium">Plate Preview</h2>
                        <img 
                            src="/images/plates/plate_img.png"
                            alt="plate image"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <p className="text-[#717171] text-2xl font-medium">Price :</p>
                        <h3 className="text-[#192540] text-2xl font-bold mt-3">
                            1,000,000 <span className="text-sm relative top-1">AED</span>
                        </h3>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <p className="text-[#717171] text-2xl font-medium">Plan :</p>
                        <h3 className="text-[#192540] text-2xl font-medium">Gold</h3>
                    </div>
                </div>

                <button className="w-full h-14 bg-[#EBAF29] rounded-md mt-8 text-[#192540] text-lg font-semibold cursor-pointer md:mb-10">
                    Publish All Plates
                </button>
            </div>

            <WhyChooseNumra />
        </section>
    )
}

export default ConfirmPlate
