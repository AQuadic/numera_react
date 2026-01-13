import ForgetPassForm from "./ForgetPassForm";
import BackButton from "../BackButton";
import ChangeLanguage from "../../general/ChangeLanguage";

const ForgetPassPage = () => {
  return (
    <div className="min-h-screen w-full flex bg-white mb-8">
      <div className="hidden md:block md:fixed md:inset-y-0 md:start-0 md:w-1/2 h-screen">
        <img
          src="/images/auth/auth_image.png"
          alt="numera"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-24 md:ms-[50%] relative max-w-screen">
        <div className="absolute top-6 end-6 z-20">
          <ChangeLanguage />
        </div>
        <BackButton />
        <div className="w-full max-w-[684px]">
          <img
            src="/images/headedfr/numra_logo.png"
            alt="numera logo"
            className="block md:hidden mx-auto mb-6 w-40"
          />

          <ForgetPassForm />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassPage;
