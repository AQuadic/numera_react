import { useTranslation } from "react-i18next";

const NoPlatesEmptyState = () => {
    const { t } = useTranslation("home");
    return (
        <section className="flex flex-col items-center justify-center gap-8">
            <img 
                src="/images/no_plates.png" 
                alt="no plates"
                className="md:w-[455px] md:h-[335px]"
            />
            <p className="text-[#192540] text-xl font-medium">
                {t('no_results')}
            </p>
        </section>
    )
}

export default NoPlatesEmptyState
