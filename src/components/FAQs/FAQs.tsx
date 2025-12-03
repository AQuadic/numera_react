import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

const faqData = [
  {
    question: "How do I buy a plate number?",
    answer: "You can browse available plates, filter by category, and select the one you prefer. After that, complete the payment or contact the seller directly."
  },
  {
    question: "How do I list my plate for sale",
    answer: "You can browse available plates, filter by category, and select the one you prefer. After that, complete the payment or contact the seller directly."
  },
  {
    question: "Are the plate numbers verified",
    answer: "You can browse available plates, filter by category, and select the one you prefer. After that, complete the payment or contact the seller directly."
  },
  {
    question: "Can I negotiate the price?",
    answer: "You can browse available plates, filter by category, and select the one you prefer. After that, complete the payment or contact the seller directly."
  },
  {
    question: "How do I contact the seller",
    answer: "You can browse available plates, filter by category, and select the one you prefer. After that, complete the payment or contact the seller directly."
  },
  {
    question: "How do I delete my account?",
    answer: "You can browse available plates, filter by category, and select the one you prefer. After that, complete the payment or contact the seller directly."
  },
]

const FAQs = () => {
    return (
        <section className="container flex md:flex-row flex-col items-center gap-4 md:py-[68px]">
        <img src="/images/faq/faq.png" alt="faq"/>

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
                <AccordionItem key={i} value={`item-${i}`} className="mt-6">
                    <AccordionTrigger
                    className="text-[#192540] text-base font-medium flex items-center justify-between
                                [&>svg]:hidden 
                                data-[state=open]:bg-[#FDFAF3] data-[state=open]:border-none 
                                bg-white px-3 py-2 rounded-md border"
                    >
                    <span className="text-[#192540] text-2xl font-medium">{item.question}</span>

                    <span className="text-xl font-bold block data-[state=open]:hidden">+</span>
                    <span className="text-xl font-bold hidden data-[state=open]:block">−</span>
                    </AccordionTrigger>

                    <AccordionContent className="bg-[#FDFAF3] px-3 py-2 rounded-b-md">
                    <p>{item.answer}</p>
                    </AccordionContent>
                </AccordionItem>
                ))}

            </Accordion>
            </div>
        </div>
        </section>
    )
}

export default FAQs
