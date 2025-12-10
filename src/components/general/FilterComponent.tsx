import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const FilterComponent = () => {
    return (
        <div>
            <div className="px-6">
                <h2 className="text-[#192540] text-2xl font-medium">Filter</h2>
                <div className="mt-4">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border rounded-[10px] px-3 py-4">
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
                </div>

                <div className="mt-4">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-[#192540] text-base font-medium">Select plate type</AccordionTrigger>
                        <AccordionContent className="border rounded-[10px] px-3 py-4">
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

                <div className="mt-4">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-[#192540] text-base font-medium">Select code</AccordionTrigger>
                        <AccordionContent className="border rounded-[10px] px-3 py-4">
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

                <button className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold mt-4">
                Apply
                </button>
            </div>
        </div>
    )
}

export default FilterComponent
