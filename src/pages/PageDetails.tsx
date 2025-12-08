import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPages, type Page } from "../lib/api/pages/getPages";
import Spinner from "../components/icons/general/Spinner";

const PageDetails = () => {
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

    return (
        <div className="container py-10">
        <h1 className="text-2xl font-bold mb-4">{page.title.en}</h1>
        <div
            className="text-base"
            dangerouslySetInnerHTML={{ __html: page.description.en }}
        />
        </div>
    );
};

export default PageDetails;
