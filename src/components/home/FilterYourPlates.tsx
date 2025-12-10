import { useState, useEffect } from "react";
import { Link } from "react-router";
import Filter from "../icons/home/Filter";
import PlateCard from "./PlateCard";
import { getPlates } from "../../lib/api";
import type { Plate } from "../../lib/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import FilterComponent from "../general/FilterComponent";

const FilterYourPlates = () => {
  const [plates, setPlates] = useState<Plate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlates = async () => {
      try {
        setLoading(true);
        const response = await getPlates({ page: 1 });
        setPlates(response.data.slice(0, 8)); // Show first 8 plates
      } catch (error) {
        console.error("Error fetching plates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlates();
  }, []);

  return (
    <div className="container md:py-[58px] py-10">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">
          Filter Your Plates
        </h2>

        <div className="flex items-center gap-6 mt-2 lg:mt-0">
          <Dialog>
              <DialogTrigger className="w-full">
                <div className="lg:w-[180px] w-full h-14 border border-[#F0F0F0] rounded-md flex items-center justify-center gap-3">
                  <p className="text-[#717171] font-semibold">Filter</p>
                  <Filter />
                </div>
              </DialogTrigger>
              <DialogContent className="w-[860px] px-0!">
                  <DialogHeader>
                  <DialogTitle ></DialogTitle>
                  <DialogDescription>
                      <FilterComponent />
                  </DialogDescription>
                  </DialogHeader>
              </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-6">
          {Array.from({ length: 8 }, (_, index) => `skeleton-${index}`).map(
            (key) => (
              <div
                key={key}
                className="md:w-[282px] w-full h-[400px] rounded-lg bg-[#F0F0F0] animate-pulse"
              />
            )
          )}
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-6">
            {plates.map((plate) => (
              <PlateCard key={plate.id} plate={plate} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center">
            <Link
              to="/plates_filter"
              className="px-8 py-3 bg-[#EBAF29] text-[#192540] font-semibold rounded-lg hover:bg-[#d9a01f] transition-colors"
            >
              See All Plates
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterYourPlates;
