import { useState, useEffect } from "react";
import { Link } from "react-router";
import Filter from "../icons/home/Filter";
import PlateCard from "./PlateCard";
import { getPlates, type Plate } from "../../lib/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import FilterComponent from "../general/FilterComponent";
import RightArrow from "../icons/plates/RightArrow";
import Spinner from "../icons/general/Spinner";

interface PlatesByPackage {
  [packageName: string]: Plate[];
}

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

  const platesByPackage: PlatesByPackage = plates.reduce((acc, plate) => {
    const packageName = plate.package_user.package.name.en;
    if (!acc[packageName]) acc[packageName] = [];
    acc[packageName].push(plate);
    return acc;
  }, {} as PlatesByPackage);

  if (loading) {
    return (
      <div className="container flex items-center justify-center md:py-[58px] py-10">
          <Spinner />
      </div>
    );
  }

  return (
    <div className="container md:py-[58px] py-10">
    {Object.entries(platesByPackage).map(([packageName, plates]) => (
      <div key={packageName} className="mt-10">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">
          {packageName} ADs
        </h2>

        <div className="flex items-center gap-6">
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

          {plates.length === 0 ? (
            <p className="text-gray-500">No plates available</p>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {plates.slice(0, 8).map((plate) => (
                  <PlateCard key={plate.id} plate={plate} />
                ))}
              </div>

              {plates.length > 8 && (
                <div className="mt-8 flex items-center justify-center">
                  <Link
                    to={`/plates_filter?package=${packageName}`}
                    className="flex items-center gap-2 px-8 py-3 text-[#EBAF29] font-semibold rounded-lg"
                  >
                    See All
                    <RightArrow />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterYourPlates;
