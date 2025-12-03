import ForgetPassForm from "./ForgetPassForm"

const ForgetPassPage = () => {
    return (
        <div className="flex items-center gap-6">
            <img
                src="/images/auth/auth_image.png"
                alt="numera"
                className="w-1/2 h-full md:block hidden"
            />

            <ForgetPassForm />
        </div>
    )
}

export default ForgetPassPage

