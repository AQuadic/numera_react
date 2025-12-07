import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"

const faqData = [
  {
    question: "Can I upgrade my plan later ?",
    answer: "You can browse available plates, filter by category, and select the one you prefer. After that, complete the payment or contact the seller directly."
  },
  {
    question: "What happens when my plan expires ?",
    answer: "You can browse available plates, filter by category, and select the one you prefer. After that, complete the payment or contact the seller directly."
  },
  {
    question: "Are there any hidden fees ?",
    answer: "No, all pricing is transparent with no extra charges."
  }
]

const PlansFAQs = () => {
    return (
        <section className="mt-8">
            <h2 className="text-[#192540] text-2xl font-medium">Frequently Asked</h2>
            <div className="mt-6">
            <Accordion type="single" collapsible>

                {faqData.map((item, i) => (
                <AccordionItem
                        key={i}
                        value={`item-${i}`}
                        className="
                            mt-6 rounded-md border transition-all
                            data-[state=open]:border-[#EBAF29]
                        "
                        >
                        <AccordionTrigger
                            className="
                            text-[#192540] text-base font-medium flex items-center justify-between
                            bg-white px-3 py-2
                            "
                        >
                            <span className="text-[#192540] text-2xl font-medium">
                            {item.question}
                            </span>
                        </AccordionTrigger>

                        <AccordionContent className="px-3 py-2">
                            <p>{item.answer}</p>
                        </AccordionContent>
                    </AccordionItem>

                ))}

            </Accordion>
            </div>
        </section>
    )
}

export default PlansFAQs
