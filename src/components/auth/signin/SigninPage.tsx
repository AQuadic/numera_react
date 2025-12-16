import SignInForm from "./SignInForm";
import BackButton from "../BackButton";

const SigninPage = () => {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* left visual column (desktop) */}
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src="/images/auth/auth_image.png"
          alt="numera"
          className="w-full h-full object-cover"
        />
      </div>

      {/* right column: centered form area */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-24 relative">
        <BackButton />
        <div className="w-full max-w-[684px]">
          {/* mobile logo - keeps design from feeling empty on small screens */}
          <img
            src="/images/header/numra_logo.png"
            alt="numera logo"
            className="block md:hidden mx-auto mb-6 w-40"
          />

          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
