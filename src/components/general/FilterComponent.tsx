import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const FilterComponent = () => {
  return (
    <div className="px-6">
      <h2 className="text-[#192540] text-2xl font-medium">Filter</h2>

      <div className="mt-4 max-h-[500px] overflow-y-auto space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="emirate" className="border rounded-[10px] px-3 py-4">
            <AccordionTrigger className="text-[#192540] text-base font-medium">
              Select Emirate
            </AccordionTrigger>
            <AccordionContent>
              {["Abu Dhabi", "Dubai", "Sharjah", "Ajman"].map((emirate) => (
                <div key={emirate} className="flex items-center justify-between mb-4 last:mb-0">
                  <label className="text-[#192540] text-sm">{emirate}</label>
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-[#D9D9D9] rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="plate-type" className="border rounded-[10px] px-3 py-4">
            <AccordionTrigger className="text-[#192540] text-base font-medium">
              Select Plate Type
            </AccordionTrigger>
            <AccordionContent>
              {["Abu Dhabi", "Dubai", "Sharjah", "Ajman"].map((type) => (
                <div key={type} className="flex items-center justify-between mb-4 last:mb-0">
                  <label className="text-[#192540] text-sm">{type}</label>
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-[#D9D9D9] rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="code" className="border rounded-[10px] px-3 py-4">
            <AccordionTrigger className="text-[#192540] text-base font-medium">
              Select Code
            </AccordionTrigger>
            <AccordionContent>
              {["Abu Dhabi", "Dubai", "Sharjah", "Ajman"].map((code) => (
                <div key={code} className="flex items-center justify-between mb-4 last:mb-0">
                  <label className="text-[#192540] text-sm">{code}</label>
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-[#D9D9D9] rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft"
                  />
                </div>
              ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                </div>

                <button className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold mt-4">
                Apply
                </button>
        </div>
    )
}

export default FilterComponent
