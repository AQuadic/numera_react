import React from "react";
import { Link } from "react-router";
import { PhoneInput, type PhoneValue } from "../../compound/PhoneInput";

const SignInForm = () => {
    const [phone, setPhone] = React.useState<PhoneValue>({
        code: "EG",
        number: "",
    });

    return (
        <div className="w-full">
        <h2 className="text-[#192540] text-[40px] font-medium text-center">Sign In</h2>
        <p className="text-[#717171] text-base font-medium mt-3 leading-[150%] text-center">
            Join now and design your custom plate
        </p>

        <form className="mt-6">
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

            <div className="mt-3 text-end">
            <Link to='/forget_password' className="text-[#717171] text-lg font-medium">
                Forget Password ?
            </Link>
            </div>

            <button className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6">
            Sign in
            </button>

            <div className="mt-4 flex items-center justify-center gap-2">
            <p className="text-[#717171] text-base font-medium">
                Don't have an account ?
            </p>
            <Link to='/signup' className="text-[#EBAF29] text-lg font-semibold">
                Sign Up
            </Link>
            </div>
        </form>
        </div>
    )
    }

export default SignInForm;
