import AdsPosts from "../../../icons/profile/AdsPosts"
import Eye from "../../../icons/profile/Eye"
import Lock from "../../../icons/profile/Lock"
import PlansChat from "../../../icons/profile/PlansChat"

const UsageStatistics = () => {
    return (
        <section className="mt-8 w-full h-full bg-[#FDFAF3] rounded-md py-4 px-2">
            <h2 className="text-[#192540] text-2xl font-medium">Usage Statistics</h2>
            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-[#192540] text-base font-medium">Ads Posted</h3>
                    <span className="text-sm font-medium text-[#717171]">2/3</span>
                </div>

                <div className="w-full h-2 bg-[#E5E5E5] rounded-full mt-2">
                    <div
                    className="h-full bg-[#EBAF29] rounded-full"
                    style={{ width: `${(1 / 4) * 100}%` }}
                    ></div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                    <AdsPosts />
                    <p className="text-[#717171] text-sm font-medium">1 ad remaining this month</p>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-[#192540] text-base font-medium"> Republish</h3>
                    <span className="text-sm font-medium text-[0/0]">0/0</span>
                </div>

                <div className="w-full h-2 bg-[#E5E5E5] rounded-full mt-2">
                    <div
                    className="h-full bg-[#EBAF29] rounded-full"
                    style={{ width: `${(0) * 100}%` }}
                    ></div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                    <Lock />
                    <p className="text-[#717171] text-sm font-medium">Upgrade to enable republishing</p>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-[#192540] text-base font-medium">Total Views</h3>
                    <span className="text-sm font-medium text-[0/0]">0/0</span>
                </div>

                <div className="w-full h-2 bg-[#E5E5E5] rounded-full mt-2">
                    <div
                    className="h-full bg-[#19AA3D] rounded-full"
                    style={{ width: `${(1 / 4) * 100}%` }}
                    ></div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                    <Eye />
                    <p className="text-[#717171] text-sm font-medium">Basic Visibility</p>
                </div>
            </div>

                        <div className="mt-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-[#192540] text-base font-medium">Inquiries</h3>
                    <span className="text-sm font-medium text-[0/0]">0/0</span>
                </div>

                <div className="w-full h-2 bg-[#E5E5E5] rounded-full mt-2">
                    <div
                    className="h-full bg-[#966A08] rounded-full"
                    style={{ width: `${(1 / 14) * 100}%` }}
                    ></div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                    <PlansChat />
                    <p className="text-[#717171] text-sm font-medium">Slandered response rate</p>
                </div>
            </div>
            
        </section>
    )
}

export default UsageStatistics
