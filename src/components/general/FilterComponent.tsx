import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import type { PlateFilters } from "../../lib/api";

interface FilterComponentProps {
  onApply: (filters: PlateFilters) => void;
}

const emirates = [
  { id: 1, name: "Abu Dhabi" },
  { id: 2, name: "Dubai" },
  { id: 3, name: "Sharjah" },
  { id: 4, name: "Ajman" },
];

const vehicleTypes = ["classic", "bikes", "cars", "fun"];

const FilterComponent = ({ onApply }: FilterComponentProps) => {
  const [selectedEmirate, setSelectedEmirate] = useState<number | undefined>();
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);
  const [letters, setLetters] = useState("");
  const [numbers, setNumbers] = useState("");

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
              {emirates.map((emirate) => (
                <div key={emirate.id} className="flex items-center justify-between mb-4">
                  <label className="text-[#192540] text-sm">{emirate.name}</label>
                  <input
                    type="checkbox"
                    checked={selectedEmirate === emirate.id}
                    onChange={() => setSelectedEmirate(emirate.id)}
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
              {vehicleTypes.map((type) => (
                <div key={type} className="flex items-center justify-between mb-4">
                  <label className="text-[#192540] text-sm capitalize">{type}</label>
                  <input
                    type="checkbox"
                    checked={selectedVehicleTypes.includes(type)}
                    onChange={() =>
                      setSelectedVehicleTypes((prev) =>
                        prev.includes(type)
                          ? prev.filter((t) => t !== type)
                          : [...prev, type]
                      )
                    }
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
              <input
                value={letters}
                onChange={(e) => setLetters(e.target.value)}
                placeholder="Letters (e.g. A)"
                className="w-full border rounded-md p-2 mb-3"
              />

              <input
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="Numbers (e.g. 12345)"
                className="w-full border rounded-md p-2"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <button
        onClick={() =>
          onApply({
            emirate_id: selectedEmirate,
            vehicle_types: selectedVehicleTypes.length
              ? selectedVehicleTypes
              : undefined,
            letters: letters || undefined,
            numbers: numbers || undefined,
          })
        }
        className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold mt-4"
      >
        Apply
      </button>
    </div>
  )
}

export default FilterComponent
