import { useEffect, useState } from "react";
import { Link } from "react-router";
import Filter from "../icons/home/Filter";
import PlateCard from "./PlateCard";
import { getPlates, type Plate, type PlateFilters } from "../../lib/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import FilterComponent from "../general/FilterComponent";
import RightArrow from "../icons/plates/RightArrow";
import { Skeleton } from "../ui/skeleton";
import type { Package } from "../../lib/api/plates";
import { getPackages } from "../../lib/api/getPackages";
import { useTranslation } from "react-i18next";

interface PlatesByPackage {
  package: Package;
  plates: Plate[];
}

const FilterYourPlates = () => {
  const {t, i18n } = useTranslation("home");
  const [data, setData] = useState<PlatesByPackage[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<PlateFilters>({
    page: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const packages = await getPackages();
        const result: PlatesByPackage[] = await Promise.all(
          packages.map(async (pkg) => {
            const res = await getPlates({
              ...filters,
              package_id: pkg.id,
              page: 1,
            });

            return {
              package: pkg,
              plates: res.data.slice(0, 8),
            };
          })
        );

        setData(result);
      } catch (error) {
        console.error("Error fetching plates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);


  if (loading) {
  return (
      <div className="container md:py-[58px] py-10">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-14 w-[180px] rounded-md" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="border border-[#F0F0F0] rounded-xl p-4 space-y-4"
            >
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container md:py-[58px] py-10">
    {data.map(({ package: pkg, plates }) => (
      <div key={pkg.id} className="mt-10">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">
          {t('ads')} {i18n.language === "ar" ? pkg.name.ar : pkg.name.en}
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
                      <FilterComponent
                        onApply={(newFilters) =>
                          setFilters((prev) => ({
                            ...prev,
                            ...newFilters,
                            page: 1,
                          }))
                        }
                      />
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
                {plates.map((plate) => (
                  <PlateCard key={plate.id} plate={plate} />
                ))}
              </div>

              {plates.length > 4 && (
                <div className="mt-8 flex items-center justify-center">
                  <Link
                    to={`/plates?package=${pkg.id}`}
                    className="flex items-center gap-2 px-8 py-3 text-[#EBAF29] font-semibold rounded-lg"
                  >
                    {t('see_all')}
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
