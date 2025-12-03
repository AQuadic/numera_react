import SignUpForm from "./SignupForm"

const SignupPage = () => {
    return (
        <div className="flex items-center gap-6">
            <img
                src="/images/auth/auth_image.png"
                alt="numera"
                className="w-1/2 h-full"
            />

            <SignUpForm />
        </div>
    )
}

export default SignupPage

