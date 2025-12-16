import { useQuery } from "@tanstack/react-query";
import PlateCard from "../home/PlateCard";
import SimCard from "../home/SimCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getFavorites } from "../../lib/api/getFavorites";
import FavEmpty from "./FavEmpty";
import Spinner from "../icons/general/Spinner";

const FavPlates = () => {
  const { data: favoritePlates = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  const favoritePhoneNumbers = favoritePlates.filter(
    (fav) => fav.favorable_type === "sim"
  );

  const favoritePlatesOnly = favoritePlates.filter(
    (fav) => fav.favorable_type === "plate"
  );

  return (
    <section className="py-12">
      <h2 className="text-[#192540] text-2xl font-medium">Favorite</h2>

      <Tabs
        defaultValue="plates"
        className="flex items-center justify-center rounded-[74px]"
      >
        <TabsList className="bg-transparent flex items-center justify-center mt-13 md:gap-[68px] mb-12">
          <TabsTrigger value="plates" className="lg:w-[494px] w-full">
            Plates
          </TabsTrigger>
          <TabsTrigger value="phone_number" className="lg:w-[494px] w-full">
            Phone Number
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plates">
          {isLoading ? (
            <Spinner />
          ) : favoritePlatesOnly.length === 0 ? (
            <FavEmpty />
          ) : (
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
              {favoritePlatesOnly.map((fav) => (
                <PlateCard
                  key={fav.id}
                  plate={{ ...fav.favorable, is_favorite: true } as any}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="phone_number">
          {isLoading ? (
            <Spinner />
          ) : favoritePhoneNumbers.length === 0 ? (
            <FavEmpty />
          ) : (
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
              {favoritePhoneNumbers.map((fav) => (
                <SimCard
                  key={fav.id}
                  sim={{ ...fav.favorable, is_favorite: true } as any}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default FavPlates;
