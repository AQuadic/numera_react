import { useState } from "react";
import Filter from "../components/draw_your_plate/Filter";
import Plates from "../components/draw_your_plate/Plates";
import WhyChooseNumra from "../components/home/WhyChooseNumra";
import { FilterIcon } from "lucide-react";

const DrawYourPlatePage = () => {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="md:py-[35px]">
      <div className="md:hidden px-4 mb-4">
        <button
          onClick={() => setOpenFilter(true)}
          className="bg-[#192540] text-white px-4 py-2 rounded-md"
        >
          <FilterIcon />
        </button>
      </div>

      <div className="flex gap-6 relative">
        <div
          className={`
                        fixed top-0 start-0 h-full w-[260px] bg-white z-50
                        transform transition-transform duration-300
                        ${
                          openFilter
                            ? "translate-x-0"
                            : "ltr:-translate-x-full rtl:translate-x-full"
                        }
                        md:static md:translate-x-0 md:w-[223px] md:block
                    `}
        >
          <div className="md:hidden flex justify-end p-4">
            <button
              onClick={() => setOpenFilter(false)}
              className="text-[#192540] text-lg font-bold"
            >
              ✕
            </button>
          </div>

          <Filter />
        </div>

        {openFilter && (
          <div
            onClick={() => setOpenFilter(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          ></div>
        )}

        <Plates />
      </div>

      <WhyChooseNumra />
    </div>
  );
};

export default DrawYourPlatePage;
