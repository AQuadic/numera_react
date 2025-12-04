import OwnerInformation from "../components/plate_details/OwnerInformation"
import PlateDetailsHeader from "../components/plate_details/PlateDetailsHeader"
import PurchaseInstructions from "../components/plate_details/PurchaseInstructions"

const PlateDetails = () => {
    return (
        <div>
            <PlateDetailsHeader />
            <OwnerInformation />
            <PurchaseInstructions />
        </div>
    )
}

export default PlateDetails
