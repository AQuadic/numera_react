import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import PlateCard from "../components/home/PlateCard";
import { getPlates, getCities } from "../lib/api";
import type { Plate, City, PlateFilters as ApiPlateFilters } from "../lib/api";
import FilterIcon from "../components/icons/draw_plates/Filter";

const PlatesFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [plates, setPlates] = useState<Plate[]>([]);
  const [, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const emirateValues = [
    "abu_dhuabi",
    "dubai",
    "sharjah",
    "ajman",
    "fujairah",
    "om_qauquan",
    "ras_alkhima",
  ] as const;

  // Filter states
  const [filters, setFilters] = useState<ApiPlateFilters>(() => {
    const vehicleTypesParams = searchParams.getAll("vehicle_types[]");
    const vehicleTypesParam = searchParams.get("vehicle_types");
    const packageParam = searchParams.get("package");

    // Support both formats: vehicle_types[]=x&vehicle_types[]=y OR vehicle_types=x,y
    let vehicleTypes: string[] = [];
    if (vehicleTypesParams.length > 0) {
      vehicleTypes = vehicleTypesParams;
    } else if (vehicleTypesParam) {
      vehicleTypes = vehicleTypesParam.split(",").filter(Boolean);
    }

    return {
      emirate_id: undefined,
      vehicle_types: vehicleTypes,
      letters: "",
      numbers: "",
      price_from: undefined,
      price_to: undefined,
      package_id: packageParam ? Number(packageParam) : undefined,
    };
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  // Fetch plates
  useEffect(() => {
    const fetchPlates = async () => {
      try {
        setLoading(true);
        const response = await getPlates({
          ...filters,
          page: currentPage,
        });
        setPlates(response.data);
        setTotalPages(response.last_page);
      } catch (error) {
        console.error("Error fetching plates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlates();
  }, [filters, currentPage]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleFilterChange = (key: keyof ApiPlateFilters, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const handleVehicleTypeToggle = (type: string) => {
    setFilters((prev) => {
      const currentTypes = prev.vehicle_types || [];
      const newTypes = currentTypes.includes(type)
        ? currentTypes.filter((t) => t !== type)
        : [...currentTypes, type];

      const params = new URLSearchParams(searchParams);
      params.delete("vehicle_types[]");

      newTypes.forEach((t) => params.append("vehicle_types[]", t));
      setSearchParams(params);

      return {
        ...prev,
        vehicle_types: newTypes,
      };
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      emirate_id: undefined,
      vehicle_types: [],
      letters: "",
      numbers: "",
      price_from: undefined,
      price_to: undefined,
      package_id: filters.package_id,
    });

    const params = new URLSearchParams();
    if (filters.package_id) {
      params.set("package", String(filters.package_id));
    }
    setSearchParams(params);

    setCurrentPage(1);
  };

  const { t } = useTranslation("plates");

  return (
    <section className="container md:py-[58px] py-5">
      <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium mb-8">
        {t("title")}
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-[280px] w-full bg-[#F0F0F0] rounded-lg p-6 h-fit">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FilterIcon />
              <h3 className="text-lg font-semibold text-[#192540]">
                {t("filters")}
              </h3>
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-[#966A08] hover:underline cursor-pointer"
            >
              {t("clearAll")}
            </button>
          </div>

          {/* Vehicle Types */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              {t("vehicleType")}
            </h4>
            <div className="space-y-2">
              {["cars", "classic", "bikes", "fun"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.vehicle_types?.includes(type)}
                    onChange={() => handleVehicleTypeToggle(type)}
                    className="w-4 h-4 accent-[#EBAF29]"
                  />
                  <span className="text-sm text-[#192540] capitalize">
                    {t(`vehicleTypes.${type}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Emirate */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              {t("emirate")}
            </h4>
            <select
              value={filters.emirate_id || ""}
              onChange={(e) =>
                handleFilterChange(
                  "emirate_id",
                  e.target.value || undefined
                )
              }
              className="w-full px-3 py-2 border border-[#F0F0F0] rounded-md text-sm"
            >
              <option value="">{t("allEmirates")}</option>
              {emirateValues.map((emirate) => (
                <option key={emirate} value={emirate}>
                  {t(`emirates.${emirate}`)}
                </option>
              ))}
            </select>
          </div>

          {/* Letters */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              {t("letters")}
            </h4>
            <input
              type="text"
              value={filters.letters || ""}
              onChange={(e) => handleFilterChange("letters", e.target.value)}
              placeholder={t("lettersPlaceholder")}
              className="w-full px-3 py-2 border border-[#F0F0F0] rounded-md text-sm"
            />
          </div>

          {/* Numbers */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              {t("numbers")}
            </h4>
            <input
              type="text"
              value={filters.numbers || ""}
              onChange={(e) => handleFilterChange("numbers", e.target.value)}
              placeholder={t("numbersPlaceholder")}
              className="w-full px-3 py-2 border border-[#F0F0F0] rounded-md text-sm"
            />
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              {t("priceRange")}
            </h4>
            <div className="space-y-3">
              <input
                type="number"
                value={filters.price_from || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "price_from",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                placeholder={t("minPrice")}
                className="w-full px-3 py-2 border border-[#F0F0F0] rounded-md text-sm"
              />
              <input
                type="number"
                value={filters.price_to || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "price_to",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                placeholder={t("maxPrice")}
                className="w-full px-3 py-2 border border-[#F0F0F0] rounded-md text-sm"
              />
            </div>
          </div>
        </div>

        {/* Plates Grid */}
        <div className="flex-1">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[400px] rounded-lg bg-[#F0F0F0] animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && plates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#717171] text-lg">{t("noPlates")}</p>
            </div>
          )}

          {!loading && plates.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {plates.map((plate) => (
                  <PlateCard key={plate.id} plate={plate} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#F0F0F0] text-[#192540] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e0e0e0]"
                  >
                    {t("previous")}
                  </button>

                  <span className="text-sm text-[#717171]">
                    {t("pageOf", { current: currentPage, total: totalPages })}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[#EBAF29] text-[#192540] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d9a01f]"
                  >
                    {t("next")}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlatesFilter;
