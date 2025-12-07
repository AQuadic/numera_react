import GoldViews from "../../icons/profile/GoldViews"
import Premium from "../../icons/profile/Premium"
import Time from "../../icons/profile/Time"

const WhyUpgrade = () => {
    return (
        <section className="mt-12">
            <h2 className="text-[#192540] text-2xl font-medium">Why Upgrade ?</h2>
            <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                    <GoldViews />
                    <div>
                        <h2 className="text-[#192540] text-xl font-medium">3x More Views</h2>
                        <p className="text-[#717171] text-base font-normal mt-1">Premium ads get significantly more <br /> visibility.</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Time />
                    <div>
                        <h2 className="text-[#192540] text-xl font-medium">3x More Views</h2>
                        <p className="text-[#717171] text-base font-normal mt-1">Featured listings sell much quicker..</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Premium />
                    <div>
                        <h2 className="text-[#192540] text-xl font-medium">3x More Views</h2>
                        <p className="text-[#717171] text-base font-normal mt-1">Get priority help when you need it.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyUpgrade
