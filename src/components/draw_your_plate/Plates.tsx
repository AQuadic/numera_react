import PlateCard from "../home/PlateCard"

const Plates = () => {
    return (
        <div>
            <div className="flex flex-wrap items-center justify-center gap-6">
                {[...Array(12)].map((_, index) => (
                    <PlateCard key={index}  />
                ))}
            </div>
        </div>
    )
}

export default Plates
