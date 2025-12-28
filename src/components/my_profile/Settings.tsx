import Bell from "../icons/header/Bell"
import Language from "../icons/profile/Language"
import { Switch } from "../ui/switch"

const Settings = () => {
    return (
        <div className="py-17">
            <h2 className="text-[#192540] text-2xl font-medium">
                App Setting
            </h2>

            <div className="w-full py-4 px-6 border border-[#F0F0F0] rounded-md mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Language />
                    <p className="text-[#192540] text-base font-medium">
                        Language
                    </p>
                </div>
                <p className="text-[#717171] text-base">
                    English
                </p>
            </div>

            <div className="w-full py-4 px-6 border border-[#F0F0F0] rounded-md mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bell />
                    <p className="text-[#192540] text-base font-medium">
                        Notification
                    </p>
                </div>
                <Switch />
            </div>
        </div>
    )
}

export default Settings
