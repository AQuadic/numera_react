import BrownCheck from "../../icons/profile/BrownCheck"
import DarkCheck from "../../icons/profile/DarkCheck"
import Diamond from "../../icons/profile/Diamond"
import Gold from "../../icons/profile/Gold"
import GreenCheck from "../../icons/profile/GreenCheck"
import Silver from "../../icons/profile/Silver"

const PlanCards = () => {
    return (
        <section>
            <div className="flex lg:flex-row flex-col items-center justify-between gap-6">
                {/* Silver */}
                <div className="w-full h-[444px] px-2 py-4 rounded-md bg-[#F1F1F1] flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Silver />
                        <div>
                        <h3 className="text-[#192540] text-xl font-medium">Silver</h3>
                        <p className="text-[#717171] text-sm font-medium mt-1">Basic Visibility</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-[#19AA3D] text-lg font-semibold">Free</h3>
                        <p className="text-[#717171] text-sm font-medium">7 Days</p>
                    </div>
                    </div>

                    <div className="mt-5">
                    <ul>
                        <li className="flex items-center gap-2">
                        <GreenCheck />
                        <p className="text-[#717171] text-base font-medium">Standard listing visibility.</p>
                        </li>
                        <li className="flex items-center gap-2 mt-3">
                        <GreenCheck />
                        <p className="text-[#717171] text-base font-medium">Basic search results.</p>
                        </li>
                        <li className="flex items-center gap-2 mt-3">
                        <GreenCheck />
                        <p className="text-[#717171] text-base font-medium">Up to 5 photos.</p>
                        </li>
                        <li className="flex items-center gap-2 mt-3">
                        <GreenCheck />
                        <p className="text-[#717171] text-base font-medium">Email support.</p>
                        </li>
                    </ul>
                    </div>
                </div>

                <button className="w-full h-12 bg-[#E5E5E5] rounded-[10px] text-[#192540] text-base font-semibold">
                    Select Silver
                </button>
                </div>

                {/* Gold */}
                <div className="w-full h-[444px] px-2 py-4 rounded-md bg-[#FDFAF3] flex flex-col justify-between border-2 border-[#EBAF29] relative">
                    <div 
                        className="absolute -top-4 left-32 w-[98px] h-8 rounded-md text-[#192540] text-base font-semibold flex items-center justify-center"
                        style={{ background: "linear-gradient(90deg, #EBAF29 0%, #FACC15 100%)" }}
                    >
                        Popular
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                        <div className="flex  items-center gap-2">
                            <Gold />
                            <div>
                                <h3 className="text-[#192540] text-xl font-medium">Gold</h3>
                                <p className="text-[#717171] text-sm font-medium mt-1">Enhance Visibility</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[#966A08] text-lg font-semibold">$99</h3>
                            <p className="text-[#717171] text-sm font-medium">30 Days</p>
                        </div>
                    </div>

                    <div className="mt-5">
                        <ul>
                            <li className="flex items-center gap-2">
                                <BrownCheck />
                                <p className="text-[#717171] text-base font-medium">Priority in search results.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <BrownCheck />
                                <p className="text-[#717171] text-base font-medium">Featured on homepage.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <BrownCheck />
                                <p className="text-[#717171] text-base font-medium">Up to 15 photos.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <BrownCheck />
                                <p className="text-[#717171] text-base font-medium">Premium badge.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <BrownCheck />
                                <p className="text-[#717171] text-base font-medium">Priority customer support.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <BrownCheck />
                                <p className="text-[#717171] text-base font-medium">Social media promotion.</p>
                            </li>
                        </ul>
                    </div>
                    </div>

                    <button
                        className="w-full h-12 rounded-[10px] text-[#192540] text-base font-semibold"
                        style={{ background: "linear-gradient(90deg, #EBAF29 0%, #FACC15 100%)" }}
                        >
                        Select Gold
                    </button>
                </div>

                {/* Diamond */}
                <div className="w-full h-[444px] px-2 py-4 rounded-md bg-[#EEF6FF] flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between">
                        <div className="flex  items-center gap-2">
                            <Diamond />
                            <div>
                                <h3 className="text-[#192540] text-xl font-medium">Diamond</h3>
                                <p className="text-[#717171] text-sm font-medium mt-1">Basic Visibility</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[#192540] text-lg font-semibold">$199</h3>
                            <p className="text-[#717171] text-sm font-medium">60 Days</p>
                        </div>
                    </div>

                    <div className="mt-5">
                        <ul>
                            <li className="flex items-center gap-2">
                                <DarkCheck />
                                <p className="text-[#717171] text-base font-medium">Standard listing visibility.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <DarkCheck />
                                <p className="text-[#717171] text-base font-medium">Basic search results.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <DarkCheck />
                                <p className="text-[#717171] text-base font-medium">Up to 5 photos.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <DarkCheck />
                                <p className="text-[#717171] text-base font-medium">Email support.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <DarkCheck />
                                <p className="text-[#717171] text-base font-medium">Standard listing visibility.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <DarkCheck />
                                <p className="text-[#717171] text-base font-medium">Basic search results.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <DarkCheck />
                                <p className="text-[#717171] text-base font-medium">Up to 5 photos.</p>
                            </li>
                            <li className="flex items-center gap-2 mt-3">
                                <DarkCheck />
                                <p className="text-[#717171] text-base font-medium">Email support.</p>
                            </li>
                        </ul>
                    </div>
                    </div>

                    <button
                        className="w-full h-12 rounded-[10px] text-[#FEFEFE] text-base font-semibold"
                        style={{ background: "linear-gradient(90deg, #60A5FA 0%, #A855F7 100%)" }}
                        >
                        Select Diamond
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PlanCards
