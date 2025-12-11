const AdsEmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img 
                src="/images/ads_empty.png"
                alt="empty"
            />
            <p className="text-[#192540] text-base font-medium">Your ads list is empty</p>
        </div>
    )
}

export default AdsEmptyState
