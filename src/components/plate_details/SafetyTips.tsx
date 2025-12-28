import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Check from "../icons/plates/Check";
import Safety from "../icons/plates/Safety";
import { getSafety, type SafetyResponse } from "../../lib/api/safety";
import Spinner from "../icons/general/Spinner";

const SafetyTips = () => {
    const { t, i18n } = useTranslation("plates");
    const { data, isLoading } = useQuery<SafetyResponse>({
        queryKey: ["safetyTips"],
        queryFn: getSafety,
    });

    if (isLoading) return <div className="flex items-center justify-center">
        <Spinner />
    </div>

    return (
        <section className="container md:py-10">
        <div className="flex items-center gap-2 mb-4">
            <Safety />
            <h2 className="text-[#192540] text-[32px] font-medium">{t("safety_tips_title")}</h2>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
            {data?.tips.map((tipItem, index) => (
            <div key={index} className="flex items-start gap-2">
                <Check />
                <p className="text-[#4B5563] text-base font-medium">{tipItem.tip[i18n.language as 'en' | 'ar']}</p>
            </div>
            ))}
        </div>
        </section>
    );
};

export default SafetyTips;
