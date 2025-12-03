import SignInForm from "./SignInForm"

const SigninPage = () => {
    return (
        <div className="flex items-center gap-6">
            <img
                src="/images/auth/auth_image.png"
                alt="numera"
                className="w-1/2 h-full"
            />

            <SignInForm />
        </div>
    )
}

export default SigninPage

