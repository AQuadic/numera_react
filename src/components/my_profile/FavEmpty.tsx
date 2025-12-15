const FavEmpty = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img 
                src="../../../public/images/no_fav.png"
                alt="no fav"
            />

            <p className="text-[#192540] text-xl font-medium mt-8">No favorite plates yet. Start exploring and mark your favorite ones</p>
        </div>
    )
}

export default FavEmpty
