import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPages, type Page } from "../lib/api/pages/getPages";
import Spinner from "../components/icons/general/Spinner";
import { useTranslation } from "react-i18next";

const PageDetails = () => {
    const { i18n } = useTranslation();
    const { id } = useParams<{ id: string }>();

    const { data: pages, isLoading, error } = useQuery<Page[]>({
        queryKey: ["pages"],
        queryFn: getPages,
    });

    if (isLoading) return <div className="flex items-center justify-center">
        <Spinner />
    </div>
    if (error) return <p>Failed to load page.</p>;

    const page = pages?.find((p) => p.id === Number(id));

    if (!page) return <p>Page not found.</p>;
    const lang = i18n.language.startsWith("ar") ? "ar" : "en";

    return (
        <div className="container py-10" dir={lang === "ar" ? "rtl" : "ltr"}>
        <h1 className="text-2xl font-bold mb-4">
            {page.title?.[lang]}
        </h1>

        <div
            className="text-base"
            dangerouslySetInnerHTML={{
            __html: page.description?.[lang],
            }}
        />
        </div>
    );
};

export default PageDetails;
