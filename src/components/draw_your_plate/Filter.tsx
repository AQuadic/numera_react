import FilterIcon from "../icons/draw_plates/Filter"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

const Filter = () => {
    return (
        <div className="w-[223px] md:h-screen h-full overflow-y-auto md:bg-[#F0F0F0] py-8 px-4">
            <div className="flex items-center gap-3">
                <FilterIcon />
                <p className="text-[#192540] text-xl font-medium">Filter</p>
            </div>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[#192540] text-base font-medium">Select Emirate</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Abu Dhabi</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Dubai</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Sharjah</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Ajman</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <hr />

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[#192540] text-base font-medium">Select Plate Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Abu Dhabi</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Dubai</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Sharjah</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Ajman</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <hr />

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[#192540] text-base font-medium">Code</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Abu Dhabi</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Dubai</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Sharjah</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="default-checkbox" className="text-[#192540] text-sm">Ajman</label>
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-[#D9D9D9] border-default-medium rounded-xs bg-transparent focus:ring-2 focus:ring-brand-soft" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default Filter
