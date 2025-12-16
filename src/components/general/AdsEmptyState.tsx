const AdsEmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img 
                src="/images/ads_empty.png"
                alt="empty"
            />
            <p className="text-[#192540] text-base font-medium mt-10">Your ads list is empty. Create a new ad to get started.</p>
        </div>
    )
}

export default AdsEmptyState
