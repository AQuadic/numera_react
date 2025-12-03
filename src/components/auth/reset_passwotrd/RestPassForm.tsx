const ResetPassForm = () => {
    return (
        <div className="md:w-1/2 w-full px-8 md:px-0">
        <h2 className="text-[#192540] text-[40px] font-medium text-center">Reset Password</h2>
        <p className="text-[#717171] text-base font-medium mt-3 leading-[150%] text-center">
            Please enter your new password !
        </p>

        <form className="mt-6">
            <div className="mt-6">
            <label htmlFor="password" className="text-[#192540] text-xl font-medium leading-[100%]">Password</label>
            <input 
                type="password" 
                className="w-full h-14 border border-[#F0F0F0] rounded-md mt-3 px-3 placeholder:text-sm placeholder:font-medium"
                placeholder="Enter your password"
            />
            </div>

            <div className="mt-6">
            <label htmlFor="confirm_password" className="text-[#192540] text-xl font-medium leading-[100%]">Confirm Password</label>
            <input 
                type="password" 
                className="w-full h-14 border border-[#F0F0F0] rounded-md mt-3 px-3 placeholder:text-sm placeholder:font-medium"
                placeholder="Enter your password"
            />
            </div>
            <button className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6">
                Confirm
            </button>
        </form>
        </div>
    )
    }

export default ResetPassForm;
