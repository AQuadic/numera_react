import OwnerInformation from "../components/plate_details/OwnerInformation"
import PlateDetailsHeader from "../components/plate_details/PlateDetailsHeader"
import PurchaseInstructions from "../components/plate_details/PurchaseInstructions"
import SafetyTips from "../components/plate_details/SafetyTips"

const PlateDetails = () => {
    return (
        <div>
            <PlateDetailsHeader />
            <OwnerInformation />
            <PurchaseInstructions />
            <SafetyTips />
        </div>
    )
}

export default PlateDetails
