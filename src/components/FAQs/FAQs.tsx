import { getFaqs } from "../../lib/api/faq/getFAQs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

const FAQs = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["faqs", page],
    queryFn: () => getFaqs(page),
  });

  if (isLoading) {
    return (
      <section className="container flex md:flex-row flex-col items-center gap-4 md:py-[68px]">

        <Skeleton className="w-full h-[400px] rounded-lg" />

        <div className="w-full">
          <Skeleton className="h-8 w-[320px] rounded-md" />

          <Skeleton className="h-5 w-full mt-4 rounded-md" />
          <Skeleton className="h-5 w-[90%] mt-2 rounded-md" />

          <div className="mt-6 space-y-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-md" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const faqData = data?.data ?? [];

    return (
        <section className="container flex md:flex-row flex-col items-center gap-4 md:py-[68px]">
        <img src="/images/faq/faq.png" alt="faq" />

        <div>
            <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">
            Frequently Asked <span className="text-[#BF8A14]">Questions</span>
            </h2>

            <p className="text-[#717171] text-xl font-medium mt-4">
            Find answers to the most common questions about our services and features. This guide helps
            you get the information you need quickly and easily.
            </p>

            <div className="mt-6">
            <Accordion type="single" collapsible>

                {faqData.map((item, i) => (
                <AccordionItem key={item.id} value={`item-${i}`} className="mt-6">
                    <AccordionTrigger
                    className="group text-[#192540] text-base font-medium flex items-center justify-between
                                [&>svg]:hidden 
                                bg-white px-3 py-2 rounded-md border
                                data-[state=open]:bg-[#FDFAF3] data-[state=open]:border-none"
                    >

                      <span className="text-[#192540] md:text-2xl text-lg font-medium">
                        {item.question.en}
                      </span>

                      <div>
                        <span className="text-xl font-bold group-data-[state=open]:hidden">+</span>
                        <span className="text-xl font-bold hidden group-data-[state=open]:block">−</span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="bg-[#FDFAF3] px-3 py-2 rounded-b-md">
                    <p>{item.answer.en}</p>
                    </AccordionContent>
                </AccordionItem>
                ))}

            </Accordion>

            {page >= 2 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  disabled={!data?.prev_page_url}
                  onClick={() => setPage(page - 1)}
                  className={`px-4 py-2 rounded-md border 
                    ${!data?.prev_page_url ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                >
                  Previous
                </button>

                <span className="text-[#192540] font-medium">
                  Page {data?.current_page}
                </span>

                <button
                  disabled={!data?.next_page_url}
                  onClick={() => setPage(page + 1)}
                  className={`px-4 py-2 rounded-md border 
                    ${!data?.next_page_url ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                >
                  Next
                </button>
              </div>
            )}
            </div>
        </div>
        </section>
    )
}

export default FAQs
