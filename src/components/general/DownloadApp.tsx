import AppStore from "../icons/plates/AppStore"
import GooglePlay from "../icons/plates/GooglePlay"

const DownloadApp = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-[#192540] md:text-[32px] font-medium md:px-8">Get the App Now !</h2>
                    <p className="text-[#717171] md:text-xl font-medium mt-6 md:px-8">Enjoy quick access to exclusive car plates, motorcycle plate and premium phone numbers. All right from your phone with a smooth and fast app experience.</p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 md:px-8 px-2 mt-8">
                        <GooglePlay />
                        <AppStore />
                    </div>
                </div>

                <div className="">
                    <img 
                        src="/images/getApp.png"
                        alt="get app"
                    />
                </div>
            </div>
        </div>
    )
}

export default DownloadApp
