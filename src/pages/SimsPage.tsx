import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SimCard from "../components/home/SimCard";
import { getSims } from "../lib/api";
import type { Sim, SimFilters as ApiSimFilters } from "../lib/api";

const SimsPage = () => {
  const [sims, setSims] = useState<Sim[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [filters, setFilters] = useState<ApiSimFilters>({
    numbers: "",
    price_from: undefined,
    price_to: undefined,
  });

  // Fetch sims
  useEffect(() => {
    const fetchSims = async () => {
      try {
        setLoading(true);
        const response = await getSims({
          ...filters,
          page: currentPage,
        });
        setSims(response.data);
        setTotalPages(response.last_page);
      } catch (error) {
        console.error("Error fetching sims:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSims();
  }, [filters, currentPage]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleFilterChange = (key: keyof ApiSimFilters, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      numbers: "",
      price_from: undefined,
      price_to: undefined,
    });
    setCurrentPage(1);
  };

  const { t } = useTranslation("sims");

  return (
    <section className="container md:py-[58px] py-5">
      <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium mb-8">
        {t("title")}
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-[280px] w-full bg-[#FDFAF3] rounded-lg p-6 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#192540]">
              {t("filters")}
            </h3>
            <button
              onClick={clearFilters}
              className="text-sm text-[#966A08] hover:underline"
            >
              {t("clearAll")}
            </button>
          </div>

          {/* Numbers */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#192540] mb-3">
              {t("searchNumbers")}
            </h4>
            <input
              type="text"
              value={filters.numbers || ""}
              onChange={(e) => handleFilterChange("numbers", e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full px-3 py-2 border border-[#F0F0F0] rounded-md text-sm"
            />
            <p className="text-xs text-[#717171] mt-1">{t("searchHelper")}</p>
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

          {/* Info Box - removed per design request */}
        </div>

        {/* Sims Grid */}
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

          {!loading && sims.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#717171] text-lg">{t("noSims")}</p>
              <p className="text-[#717171] text-sm mt-2">{t("tryAdjust")}</p>
            </div>
          )}

          {!loading && sims.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sims.map((sim) => (
                  <SimCard key={sim.id} sim={sim} />
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

export default SimsPage;
