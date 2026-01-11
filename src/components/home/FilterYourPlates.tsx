import { useEffect, useState } from "react";
import { Link } from "react-router";
import Filter from "../icons/home/Filter";
import PlateCard from "./PlateCard";
import { getPlates, type Plate, type PlateFilters } from "../../lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FilterComponent from "../general/FilterComponent";
import RightArrow from "../icons/plates/RightArrow";
import { Skeleton } from "../ui/skeleton";
import type { Package } from "../../lib/api/plates";
import { getPackages } from "../../lib/api/getPackages";
import { useTranslation } from "react-i18next";
import Search from "../icons/home/Search";
import NoPlatesEmptyState from "./NoPlatesEmptyState";

interface PlatesByPackage {
  package: Package;
  plates: Plate[];
}

const FilterYourPlates = () => {
  const { t, i18n } = useTranslation("home");
  const [data, setData] = useState<PlatesByPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQueries, setSearchQueries] = useState<Record<number, string>>(
    {}
  );
  const [searchLoading, setSearchLoading] = useState<Record<number, boolean>>(
    {}
  );
  const [filters] = useState<PlateFilters>({ page: 1 });
  const [filtersByPackage, setFiltersByPackage] = useState<
    Record<number, PlateFilters>
  >({});
  const [openDialogs, setOpenDialogs] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const packages = await getPackages();

      const result = await Promise.all(
        packages.map(async (pkg) => {
          const res = await getPlates({
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
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timeouts: Record<number, ReturnType<typeof setTimeout>> = {};

    Object.entries(searchQueries).forEach(([pkgId, query]) => {
      const packageId = Number(pkgId);

      timeouts[packageId] = setTimeout(async () => {
        setSearchLoading((prev) => ({ ...prev, [packageId]: true }));

        try {
          const payload: PlateFilters = {
            ...filters,
            package_id: packageId,
            page: 1,
            numbers: query.trim() || undefined,
          };

          const res = await getPlates(payload);

          setData((prev) =>
            prev.map((item) =>
              item.package.id === packageId
                ? { ...item, plates: res.data.slice(0, 8) }
                : item
            )
          );
        } catch (error) {
          console.error(
            `Error fetching plates for package ${packageId}:`,
            error
          );
        } finally {
          setSearchLoading((prev) => ({ ...prev, [packageId]: false }));
        }
      }, 500);
    });

    return () => Object.values(timeouts).forEach((t) => clearTimeout(t));
  }, [searchQueries, filters]);

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
      {data.map(({ package: pkg, plates }) => {
        const searchQuery = searchQueries[pkg.id] || "";
        const isSearching = searchLoading[pkg.id] || false;

        const isFilterActive = Boolean(
          filtersByPackage[pkg.id] &&
            Object.values(filtersByPackage[pkg.id]).some(
              (v) => v !== undefined && v !== ""
            )
        );
        return (
          <div key={pkg.id} className="mt-10">
            <div className="flex flex-wrap items-center justify-between mb-8">
              <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">
                {t("ads")} {i18n.language === "ar" ? pkg.name.ar : pkg.name.en}
              </h2>

              <div className="flex items-center gap-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9]+$/.test(value)) {
                        setSearchQueries((prev) => ({
                          ...prev,
                          [pkg.id]: value,
                        }));
                      }
                    }}
                    className="lg:w-[384px] w-full h-14 border border-[#F0F0F0] rounded-md px-12"
                    placeholder={t("search")}
                  />
                  <div className="absolute top-4 start-4">
                    <Search />
                  </div>
                  {isSearching && (
                    <div className="absolute top-4 end-4">
                      <div className="animate-spin h-5 w-5 border-2 border-[#EBAF29] border-t-transparent rounded-full" />
                    </div>
                  )}
                </div>
                <Dialog
                  open={!!openDialogs[pkg.id]}
                  onOpenChange={(open) =>
                    setOpenDialogs((prev) => ({ ...prev, [pkg.id]: open }))
                  }
                >
                  <DialogTrigger className="w-full">
                    <div className="relative">
                      <div className="lg:w-[180px] w-full h-14 border rounded-md flex items-center justify-center gap-3">
                        <p className="font-semibold">{t("filter")}</p>
                        <Filter />
                      </div>

                      {isFilterActive && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                      )}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[860px] px-0!">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription>
                        <FilterComponent
                          initialFilters={filtersByPackage[pkg.id]}
                          onApply={(newFilters) => {
                            setFiltersByPackage((prev) => {
                              const updated = { ...prev };

                              if (
                                !newFilters ||
                                Object.keys(newFilters).length === 0
                              ) {
                                delete updated[pkg.id];
                              } else {
                                updated[pkg.id] = newFilters;
                              }

                              return updated;
                            });

                            getPlates({
                              ...newFilters,
                              package_id: pkg.id,
                              page: 1,
                            }).then((res) => {
                              setData((prev) =>
                                prev.map((item) =>
                                  item.package.id === pkg.id
                                    ? { ...item, plates: res.data.slice(0, 8) }
                                    : item
                                )
                              );
                            });

                            setOpenDialogs((prev) => ({
                              ...prev,
                              [pkg.id]: false,
                            }));
                          }}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {plates.length === 0 ? (
              <NoPlatesEmptyState />
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
                      {t("see_all")}
                      <RightArrow />
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterYourPlates;
