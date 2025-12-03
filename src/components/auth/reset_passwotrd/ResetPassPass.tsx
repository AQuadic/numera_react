import ResetPassForm from "./RestPassForm"

const ResetPassPage = () => {
    return (
        <div className="flex items-center gap-6">
            <img
                src="/images/auth/auth_image.png"
                alt="numera"
                className="w-1/2 h-full md:block hidden"
            />

            <ResetPassForm />
        </div>
    )
}

export default ResetPassPage

