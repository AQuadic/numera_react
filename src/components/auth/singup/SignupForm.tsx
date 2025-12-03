import React from "react";
import { Link } from "react-router";
import { PhoneInput, type PhoneValue } from "../../compound/PhoneInput";

const SignUpForm = () => {
    const [phone, setPhone] = React.useState<PhoneValue>({
        code: "EG",
        number: "",
    });

    return (
        <div className="md:w-1/2 w-full px-8 md:px-0">
        <h2 className="text-[#192540] text-[40px] font-medium text-center">Sign Up</h2>
        <p className="text-[#717171] text-base font-medium mt-3 leading-[150%] text-center">
            Join now and design your custom plate
        </p>

        <form className="mt-6">

            <div className="mb-6">
            <label htmlFor="name" className="text-[#192540] text-xl font-medium leading-[100%]">Name</label>
            <input 
                type="name" 
                className="w-full h-14 border border-[#F0F0F0] rounded-md mt-3 px-3 placeholder:text-sm placeholder:font-medium"
                placeholder="Enter your name"
            />
            </div>

            <div>
            <label htmlFor="phone" className="text-[#192540] text-xl font-medium leading-[100%]">Phone Number</label>
            
            <div className="mt-3">
                <PhoneInput
                    value={phone}
                    onChange={(newValue) => setPhone(newValue)}
                />
            </div>
            </div>

            <div className="mt-6">
            <label htmlFor="password" className="text-[#192540] text-xl font-medium leading-[100%]">Password</label>
            <input 
                type="password" 
                className="w-full h-14 border border-[#F0F0F0] rounded-md mt-3 px-3 placeholder:text-sm placeholder:font-medium"
                placeholder="Enter your password"
            />
            </div>

            <button className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6">
            Sign up
            </button>

            <div className="mt-4 flex items-center justify-center gap-2">
            <p className="text-[#717171] text-base font-medium">
                Already have an account ?
            </p>
            <Link to='/signin' className="text-[#EBAF29] text-lg font-semibold">
                Sign In
            </Link>
            </div>
        </form>
        </div>
    )
    }

export default SignUpForm;
