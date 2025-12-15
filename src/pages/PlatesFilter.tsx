import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import PlateCard from "../components/home/PlateCard";
import { getPlates, getCities } from "../lib/api";
import type { Plate, City, PlateFilters as ApiPlateFilters } from "../lib/api";
import FilterIcon from "../components/icons/draw_plates/Filter";

const PlatesFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [plates, setPlates] = useState<Plate[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [filters, setFilters] = useState<ApiPlateFilters>({
    emirate_id: undefined,
    vehicle_types: [],
    letters: "",
    numbers: "",
    price_from: undefined,
    price_to: undefined,
  });

  // Initialize filters from URL params
  useEffect(() => {
    const vehicleTypesParams = searchParams.getAll("vehicle_types[]");
    const vehicleTypesParam = searchParams.get("vehicle_types");

    // Support both formats: vehicle_types[]=x&vehicle_types[]=y OR vehicle_types=x,y
    let vehicleTypes: string[] = [];
    if (vehicleTypesParams.length > 0) {
      vehicleTypes = vehicleTypesParams;
    } else if (vehicleTypesParam) {
      vehicleTypes = vehicleTypesParam.split(",").filter(Boolean);
    }

    setFilters((prev) => ({
      ...prev,
      vehicle_types: vehicleTypes,
    }));
  }, [searchParams]);

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getCities();
        setCities(citiesData);
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

      // Update URL params with array format
      const params = new URLSearchParams();
      if (newTypes.length > 0) {
        newTypes.forEach((t) => params.append("vehicle_types[]", t));
      }
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
    });
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <section className="container md:py-[58px] py-5">
      <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium mb-8">
        All Plates
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-[280px] w-full bg-[#F0F0F0] rounded-lg p-6 h-fit">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FilterIcon />
              <h3 className="text-lg font-semibold text-[#192540]">Filters</h3>
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-[#966A08] hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>

          {/* Vehicle Types */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              Vehicle Type
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
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Emirate */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              Emirate
            </h4>
            <select
              value={filters.emirate_id || ""}
              onChange={(e) =>
                handleFilterChange(
                  "emirate_id",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full px-3 py-2 border border-[#F0F0F0] rounded-md text-sm"
            >
              <option value="">All Emirates</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name.en}
                </option>
              ))}
            </select>
          </div>

          {/* Letters */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              Letters
            </h4>
            <input
              type="text"
              value={filters.letters || ""}
              onChange={(e) => handleFilterChange("letters", e.target.value)}
              placeholder="e.g., A"
              className="w-full px-3 py-2 border border-[#F0F0F0] rounded-md text-sm"
            />
          </div>

          {/* Numbers */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              Numbers
            </h4>
            <input
              type="text"
              value={filters.numbers || ""}
              onChange={(e) => handleFilterChange("numbers", e.target.value)}
              placeholder="e.g., 123"
              className="w-full px-3 py-2 border border-[#F0F0F0] rounded-md text-sm"
            />
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              Price Range
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
                placeholder="Min Price"
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
                placeholder="Max Price"
                className="w-full px-3 py-2 border border-[#F0F0F0] rounded-md text-sm"
              />
            </div>
          </div>
        </div>

        {/* Plates Grid */}
        <div className="flex-1">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }, (_, index) => `skeleton-${index}`).map(
                (key) => (
                  <div
                    key={key}
                    className="w-full h-[400px] rounded-lg bg-[#F0F0F0] animate-pulse"
                  />
                )
              )}
            </div>
          )}

          {!loading && plates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#717171] text-lg">No plates found</p>
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
                    Previous
                  </button>

                  <span className="text-sm text-[#717171]">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[#EBAF29] text-[#192540] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d9a01f]"
                  >
                    Next
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
