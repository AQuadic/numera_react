import CompleteTransaction from "../icons/plates/CompleteTransaction";
import ContactSeller from "../icons/plates/ContactSeller";
import OfficialTransfer from "../icons/plates/OfficialTransfer";
import VerifyDocuments from "../icons/plates/VerifyDocuments";

const details = [
    {
        icon: <ContactSeller />,
        title: "Contact the Seller",
        desc: "Use the call or WhatsApp button to discuss details and negotiate the price.",
    },
    {
        icon: <VerifyDocuments />,
        title: "Verify Documents",
        desc: "Ensure all plate registration documents are authentic and properly transferred.",
    },
    {
        icon: <CompleteTransaction />,
        title: "Complete Transaction",
        desc: "Meet in person at a safe location to complete the payment and transfer process.",
    },
    {
        icon: <OfficialTransfer />,
        title: "Official Transfer",
        desc: "Visit the traffic department to officially register the plate under your name.",
    },
];

const PurchaseInstructions = () => {
    return (
        <section className="container py-10">
        <h2 className="text-[#192540] text-[32px] font-medium">
            Purchase Instructions
        </h2>

        <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {details.map((item, index) => (
            <div key={index} className="flex gap-2 mb-6">
                {item.icon}
                <div>
                <h2 className="text-[#192540] text-xl font-medium">{item.title}</h2>
                <p className="text-[#717171] text-base leading-[150%] mt-2">
                    {item.desc}
                </p>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
};

export default PurchaseInstructions;
