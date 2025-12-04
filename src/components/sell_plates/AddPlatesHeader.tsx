const AddPlatesHeader = () => {
    return (
        <div className="flex items-center justify-center p-8 bg-white">
        <div className="flex items-start gap-[140px] relative">
            <button className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-[#EBAF29] rounded-full flex items-center justify-center">
                <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                strokeWidth="3" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M5 13l4 4L19 7" 
                />
                </svg>
            </div>
            <span className="text-xs text-[#192540] font-medium">Add Plate</span>
            </button>

            <div className="absolute top-5 left-1/2 -translate-x-1/2 h-0.5 bg-[#EBAF29]" style={{width: '160px'}}></div>

            <button className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-2 border-[#C4C4C4] rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#C4C4C4] rounded-full"></div>
            </div>
            <span className="text-xs text-[#C4C4C4] font-medium">Confirm</span>
            </button>
        </div>
        </div>
    );
}

export default AddPlatesHeader
