import DiamondIcon from "../../../icons/profile/DiamondIcon"

const DiamondPlanSection = () => {
    return (
        <section 
            className="w-full h-40 rounded-md py-4 px-8"
            style={{ background: "linear-gradient(90deg, #60A5FA 0%, #6058FF 100%)" }}
        >
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <DiamondIcon />
                    <div>
                        <h2 className="text-[#FEFEFE] text-xl font-medium">Diamond Plan</h2>
                        <p className="text-[#EFEFEF] text-sm font-normal mt-2">Premium membership <br /> active</p>
                    </div>
                </div>

                <div className="w-[92px] h-[30px] rounded-[20px] bg-[#CFCFFF] text-[#192540] font-medium flex items-center justify-center">
                    Active
                </div>
            </div>

            <div className="flex items-center justify-center gap-60">
                <div className="text-[#EFEFEF] text-sm font-medium">
                    <p>Valid until</p>
                    <h2 className="text-[#FEFEFE] text-xl font-medium mt-2">March 15,2025</h2>
                </div>

                <div className="text-[#EFEFEF] text-sm font-medium">
                    <p>Days remaining</p>
                    <h2 className="text-[#FEFEFE] text-xl font-medium mt-2">23 days</h2>
                </div>
            </div>
        </section>
    )
}

export default DiamondPlanSection
