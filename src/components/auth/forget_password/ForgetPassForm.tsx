import React from "react";
import { PhoneInput, type PhoneValue } from "../../compound/PhoneInput";

const ForgetPassForm = () => {
  const [phone, setPhone] = React.useState<PhoneValue>({
    code: "EG",
    number: "",
  });

  return (
    <div className="w-full">
      <h2 className="text-[#192540] text-[40px] font-medium text-center">
        Forget Password
      </h2>
      <p className="text-[#717171] text-base font-medium mt-3 leading-[150%] text-center">
        Enter your email and we’ll help you recover your account in just a{" "}
        <br />
        few steps.
      </p>

      <form className="mt-6">
        <div>
          <label
            htmlFor="phone"
            className="text-[#192540] text-xl font-medium leading-[100%]"
          >
            Phone Number
          </label>

          <div className="mt-3">
            <PhoneInput
              value={phone}
              onChange={(newValue) => setPhone(newValue)}
            />
          </div>
        </div>

        <button className="w-full h-14 text-[#192540] text-base font-semibold bg-[#EBAF29] rounded-md mt-6">
          Send OTP
        </button>

        <p className="text-[#192540] text-base font-medium mt-4 text-center">
          Don’t receive code?
        </p>

        <p className="text-[#717171] text-sm font-medium mt-2 text-center">
          You may request a new code in{" "}
          <span className="text-[#192540]">1:00</span>{" "}
        </p>

        <button className="text-[#EBAF29] text-base font-semibold flex mx-auto mt-3 underline">
          Send again
        </button>
      </form>
    </div>
  );
};

export default ForgetPassForm;
