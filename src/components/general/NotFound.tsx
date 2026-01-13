const NotFound = () => {
    return (
        <section className="conatiner flex items-center justify-center md:gap-6 md:py-40 py-10">
            <img 
                src="/images/not_found1.png"
                alt="not found"
                className="md:w-auto w-30"
            />

            <div className="flex flex-col items-center">
                <p className="text-[#717171] text-2xl font-medium leading-[100%]">
                    OOPS ...
                </p>

                <h2 className="text-[#192540] md:text-[115.84px] text-4xl mt-4">
                    404
                </h2>

                <p className="text-[#717171] md:text-[32px] text-sm font-bold leading-[100%] mt-6">
                    PAGE NOT FOUND
                </p>
            </div>

            <img 
                src="/images/not_found2.png"
                alt="not found"
                className="md:w-auto w-30"
            />
        </section>
    )
}

export default NotFound
