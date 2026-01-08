import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getUserPlates, type Plate } from "../../lib/api/getUserPlates";
import PlateCard from "../home/PlateCard";
import { useSearchParams, useParams } from "react-router";
import Spinner from "../icons/general/Spinner";
import NoPlatesEmptyState from "../home/NoPlatesEmptyState";
import { getSims, type Sim } from "../../lib/api";
import type { PaginatedResponse } from "../../lib/api/sims";

type Item = Plate | Sim;

const SellerPlates = () => {
  const { userId } = useParams<{ userId: string }>();
  const id = Number(userId);

  const [searchParams] = useSearchParams();
  const vehicleType = searchParams.get("type");

  const { data, isLoading }: UseQueryResult<PaginatedResponse<Item>> = useQuery({
    queryKey: ["user-items", id, vehicleType],
    queryFn: async () => {
      if (vehicleType === "sims") {
        return await getSims({ page: 1 }) as PaginatedResponse<Item>;
      } else {
        return await getUserPlates(id, 1, vehicleType ?? undefined) as PaginatedResponse<Item>;
      }
    },
  });

  const plates: Plate[] = (data?.data ?? []).filter(
    (p): p is Plate => "id" in p && "package_user_id" in p
  );

  const allPlates = plates;
  const soldPlates = plates.filter((p) => p.is_sold);
  const premiumPlates = plates.filter(
    (p) => p.package_user?.package?.name?.en !== "Free"
  );

  const renderPlates = (plates: Plate[]) => {
    if (isLoading)
      return (
        <div className="flex items-center justify-center py-10">
          <Spinner />
        </div>
      );

    if (!plates.length) return <NoPlatesEmptyState />;

    return (
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
        {plates.map((plate) => (
          <PlateCard key={plate.id} plate={plate} />
        ))}
      </div>
    );
  };

  return (
    <section className="container md:py-[58px] py-8">
      <h2 className="text-[#192540] text-2xl font-medium leading-[100%]">
        Seller Items
      </h2>

      <Tabs defaultValue="all" className="mt-8 w-full">
        <TabsList className="bg-[#FDFAF3] py-10 rounded-[74px] w-full px-40 flex justify-center gap-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderPlates(allPlates)}</TabsContent>
        <TabsContent value="premium">{renderPlates(premiumPlates)}</TabsContent>
        <TabsContent value="sold">{renderPlates(soldPlates)}</TabsContent>
      </Tabs>
    </section>
  );
};

export default SellerPlates;
