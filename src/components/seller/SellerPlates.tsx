import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getUserPlates, type Plate } from "../../lib/api/getUserPlates";
import { getSims, type Sim } from "../../lib/api";
import PlateCard from "../home/PlateCard";
import SimCard from "../home/SimCard";
import { useSearchParams, useParams } from "react-router";
import Spinner from "../icons/general/Spinner";
import NoPlatesEmptyState from "../home/NoPlatesEmptyState";
import { useTranslation } from "react-i18next";

type Item = Plate | Sim;

const SellerPlates = () => {
  const { t } = useTranslation("home");
  const { userId } = useParams<{ userId: string }>();
  const id = Number(userId);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const isSim = type === "sims";

  const { data, isLoading } = useQuery({
    queryKey: ["seller-items", id, type],
    queryFn: async () => {
      if (isSim) {
        return getSims({
          page: 1,
          user_id: id,
        });
      }

      return getUserPlates(
        id,
        1,
        type ?? undefined
      );
    },
    enabled: !!id,
  });

  const items: Item[] = data?.data ?? [];

  const allItems = items;
  const soldItems = items.filter((item) => item.is_sold);
  const premiumItems = items.filter((item) => {
    if ("package_user" in item)
      return item.package_user?.package?.name?.en !== "Free";
    if ("package" in item) return item.package !== "Free";
    return false;
  });

  const renderItems = (items: Item[]) => {
    if (isLoading)
      return (
        <div className="flex items-center justify-center py-10">
          <Spinner />
        </div>
      );

    if (!items.length) return <NoPlatesEmptyState />;

    return (
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
        {items.map((item) =>
          isSim ? (
            <SimCard key={item.id} sim={item as Sim} />
          ) : (
            <PlateCard key={item.id} plate={item as Plate} />
          )
        )}
      </div>
    );
  };

  return (
    <section className="container md:py-[58px] py-8">
      <h2 className="text-[#192540] text-2xl font-medium">
        {isSim ? t("mobile_numbers") : t("seller_plates")}
      </h2>

      <Tabs defaultValue="all" className="mt-8 w-full">
        <TabsList className="bg-[#FDFAF3] py-10 rounded-[74px] w-full px-40 flex justify-center gap-6">
          <TabsTrigger value="all">{t("all")}</TabsTrigger>
          <TabsTrigger value="premium">{t("premium")}</TabsTrigger>
          <TabsTrigger value="sold">{t("sold")}</TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderItems(allItems)}</TabsContent>
        <TabsContent value="premium">{renderItems(premiumItems)}</TabsContent>
        <TabsContent value="sold">{renderItems(soldItems)}</TabsContent>
      </Tabs>
    </section>
  );
};

export default SellerPlates;
