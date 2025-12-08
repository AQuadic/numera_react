import GreenCheck from "../../../icons/profile/GreenCheck"
import Warning from "../../../icons/profile/Warning"
import XIcon from "../../../icons/profile/XIcon"

const PlanSuggestions = () => {
    return (
        <section className="mt-6 flex md:flex-row flex-col gap-6">
            <div className="w-full h-[332px] bg-[#EFF9F2] rounded-md py-4 px-2">
                <h2 className="text-[#192540] text-xl font-medium">Your Plan Benefits</h2>
                <ul>
                    <li className="flex items-center gap-2 mt-4">
                        <GreenCheck />
                        <p className="text-[#4B5563] text-base font-medium">Up to 3 ads per month.</p>
                    </li>
                    <li className="flex items-center gap-2 mt-3.5">
                        <GreenCheck />
                        <p className="text-[#4B5563] text-base font-medium">Basic search visibility.</p>
                    </li>
                    <li className="flex items-center gap-2 mt-3.5">
                        <GreenCheck />
                        <p className="text-[#4B5563] text-base font-medium">Up to 3 photos per ad.</p>
                    </li>
                    <li className="flex items-center gap-2 mt-3.5">
                        <GreenCheck />
                        <p className="text-[#4B5563] text-base font-medium">Standard support.</p>
                    </li>
                    <li className="flex items-center gap-2 mt-3.5">
                        <XIcon />
                        <p className="text-[#4B5563] text-base font-medium line-through">republishes.</p>
                    </li>
                    <li className="flex items-center gap-2 mt-3.5">
                        <XIcon />
                        <p className="text-[#4B5563] text-base font-medium line-through">Top position in searches.</p>
                    </li>
                    <li className="flex items-center gap-2 mt-3.5">
                        <XIcon />
                        <p className="text-[#4B5563] text-base font-medium line-through">Analytics dashboard.</p>
                    </li>
                </ul>
            </div>

            <div className="w-full h-[332px] bg-[#D71F1F0A] rounded-md py-4 px-2">
                <div className="flex items-center gap-2">
                    <Warning />
                    <h2 className="text-[#192540] text-xl font-medium">Free Plan Limitations</h2>
                </div>
                <ul className="list-disc px-6">
                    <li className="text-[#4B5563] text-base font-medium mt-4">Limited to 3 ads per month.</li>
                    <li className="text-[#4B5563] text-base font-medium mt-4">No republishing feature.</li>
                    <li className="text-[#4B5563] text-base font-medium mt-4">Basic search visibility.</li>
                    <li className="text-[#4B5563] text-base font-medium mt-4">Maximum 3 photos per ad.</li>
                    <li className="text-[#4B5563] text-base font-medium mt-4">Standard customer support.</li>
                </ul>
            </div>
        </section>
    )
}

export default PlanSuggestions
