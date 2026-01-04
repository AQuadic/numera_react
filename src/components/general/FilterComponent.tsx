import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import type { PlateFilters } from "../../lib/api";
import { useTranslation } from "react-i18next";

interface FilterComponentProps {
  onApply: (filters: PlateFilters) => void;
}

const emirateValues = [
  "abu_dhuabi",
  "dubai",
  "sharjah",
  "ajman",
  "fujairah",
  "om_qauquan",
  "ras_alkhima",
];

const vehicleTypes = ["classic", "bikes", "cars", "fun"];

const FilterComponent = ({ onApply }: FilterComponentProps) => {
  const { t } = useTranslation("home");
  const [selectedEmirate, setSelectedEmirate] = useState<string | undefined>();
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);
  const [letters, setLetters] = useState("");
  const [numbers, setNumbers] = useState("");

  return (
    <div className="px-6">
      <h2 className="text-[#192540] text-2xl font-medium ltr:text-left rtl:text-right">{t("filter")}</h2>

      <div className="mt-4 max-h-[500px] overflow-y-auto space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="emirate" className="border rounded-[10px] px-3 py-4">
            <AccordionTrigger className="text-[#192540] text-base font-medium">
              {t("select_emirate")}
            </AccordionTrigger>
            <AccordionContent>
              {emirateValues.map((emirateValue) => (
                <div
                  key={emirateValue}
                  className="flex items-center justify-between mb-4"
                >
                  <label className="text-[#192540] text-sm">
                    {t(`emirates.${emirateValue}`)}
                  </label>
                  <input
                    type="checkbox"
                    checked={selectedEmirate === emirateValue}
                    onChange={() => setSelectedEmirate(emirateValue)}
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="plate-type" className="border rounded-[10px] px-3 py-4">
            <AccordionTrigger className="text-[#192540] text-base font-medium">
              {t("select_plate_type")}
            </AccordionTrigger>
            <AccordionContent>
              {vehicleTypes.map((type) => (
                <div
                  key={type}
                  className="flex items-center justify-between mb-4"
                >
                  <label className="text-[#192540] text-sm">
                    {t(`vehicle_types.${type}`)}
                  </label>
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
              {t("select_code")}
            </AccordionTrigger>
            <AccordionContent>
              <input
                value={letters}
                onChange={(e) => setLetters(e.target.value)}
                placeholder={t("letters")}
                className="w-full border rounded-md p-2 mb-3"
              />

              <input
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder={t("numbers")}
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
        className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold mt-4 cursor-pointer"
      >
        {t("apply")}
      </button>
    </div>
  );
};

export default FilterComponent;
