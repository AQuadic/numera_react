import WhyChooseNumra from "../components/home/WhyChooseNumra"
import PhoneNumDetailsHeader from "../components/phone_number_details/PhoneNumDetailsHeader"
import PurchaseInstructions from "../components/plate_details/PurchaseInstructions"
import SafetyTips from "../components/plate_details/SafetyTips"

const PhoneNumberDetails = () => {
    return (
        <div>
            <PhoneNumDetailsHeader />
            <PurchaseInstructions />
            <SafetyTips />
            <WhyChooseNumra />
        </div>
    )
}

export default PhoneNumberDetails
