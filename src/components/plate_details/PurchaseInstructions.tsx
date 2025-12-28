import CompleteTransaction from "../icons/plates/CompleteTransaction";
import ContactSeller from "../icons/plates/ContactSeller";
import OfficialTransfer from "../icons/plates/OfficialTransfer";
import VerifyDocuments from "../icons/plates/VerifyDocuments";
import { useTranslation } from "react-i18next";

const PurchaseInstructions = () => {
    const { t } = useTranslation("plates");

    const details = [
        {
            icon: <ContactSeller />,
            titleKey: "purchase_contact_title",
            descKey: "purchase_contact_desc",
        },
        {
            icon: <VerifyDocuments />,
            titleKey: "purchase_verify_title",
            descKey: "purchase_verify_desc",
        },
        {
            icon: <CompleteTransaction />,
            titleKey: "purchase_complete_title",
            descKey: "purchase_complete_desc",
        },
        {
            icon: <OfficialTransfer />,
            titleKey: "purchase_official_title",
            descKey: "purchase_official_desc",
        },
    ];
    return (
        <section className="container py-10">
        <h2 className="text-[#192540] text-[32px] font-medium">
            {t("purchase_instructions_title")}
        </h2>

        <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {details.map((item, index) => (
            <div key={index} className="flex gap-2 mb-6">
                {item.icon}
                <div>
                <h2 className="text-[#192540] text-xl font-medium">{t(item.titleKey)}</h2>
                <p className="text-[#717171] text-base leading-[150%] mt-2">
                    {t(item.descKey)}
                </p>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
};

export default PurchaseInstructions;
