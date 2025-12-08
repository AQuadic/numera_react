import Crown from "../../../icons/profile/Crown"
import FreePlanIcon from "../../../icons/profile/FreePlanIcon"
import Plus from "../../../icons/profile/Plus"

const FreePlans = () => {
    return (
        <section>
            <div className="flex items-center gap-6">
                <div className="w-[721px] h-[132px] bg-[#F0F0F0] rounded-md py-4 px-2 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                            <FreePlanIcon />
                            <div>
                                <h2 className="text-[#192540] text-xl font-medium">Free Plan</h2>
                                <p className="text-[#717171] text-sm font-medium mt-1">Basic membership</p>
                            </div>
                        </div>
                        <div className="w-[92px] h-[30px] rounded-[20px] bg-[#B2E3C4] text-[#1E7634] text-sm font-medium flex items-center justify-center">
                            Active
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-[#192540] text-xl font-medium">Free Forever</h2>
                        <p className="text-[#966A08] text-xl font-medium">$0/Month</p>
                    </div>
                </div>

                <div className="w-[162px] h-[98px] bg-[#EBAF29] rounded-[10px] flex flex-col items-center justify-center gap-1">
                    <Crown />
                    <h2 className="text-[#192540] text-base font-semibold">Upgrade Plan</h2>
                    <p className="text-[#717171] text-sm">Get more features</p>
                </div>

                <div className="w-[162px] h-[98px] border border-[#EBAF29] rounded-[10px] flex flex-col items-center justify-center gap-1">
                    <Plus />
                    <h2 className="text-[#192540] text-base font-semibold">Post New Ad</h2>
                    <p className="text-[#717171] text-sm">1 Remaining</p>
                </div>
            </div>
        </section>
    )
}

export default FreePlans
