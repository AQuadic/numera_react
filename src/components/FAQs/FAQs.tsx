import { getFaqs } from "../../lib/api/faq/getFAQs";
import Spinner from "../icons/general/Spinner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const FAQs = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["faqs", page],
    queryFn: () => getFaqs(page),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

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

                      <span className="text-[#192540] text-2xl font-medium">
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
