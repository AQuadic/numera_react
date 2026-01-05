import { useQuery } from "@tanstack/react-query";
import PlateCard from "../home/PlateCard";
import SimCard from "../home/SimCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getFavorites } from "../../lib/api/getFavorites";
import FavEmpty from "./FavEmpty";
import Spinner from "../icons/general/Spinner";
import { getPlateById } from "../../lib/api";
import { useTranslation } from "react-i18next";

const FavPlates = () => {
  const { t } = useTranslation("profile");
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

  const { data: fullPlatesData = [], isLoading: isPlatesLoading } = useQuery({
    queryKey: ["favoritePlatesFull"],
    queryFn: async () => {
      const plates = await Promise.all(
        favoritePlatesOnly.map(async (fav) => {
          const plate = await getPlateById(fav.favorable.id);
          return { ...plate, is_favorite: true };
        })
      );
      return plates;
    },
    enabled: favoritePlatesOnly.length > 0,
  });

  return (
    <section className="py-12">
      <h2 className="text-[#192540] text-2xl font-medium">{t('favorites')}</h2>

      <Tabs
        defaultValue="plates"
        className="flex items-center justify-center"
      >
        <TabsList className="bg-[#FDFAF3] flex items-center justify-center mt-13 md:gap-[68px] mb-12 py-8 px-8 rounded-[74px]">
          <TabsTrigger value="plates" className="xl:w-[494px] w-full">
            {t('plates')}
          </TabsTrigger>
          <TabsTrigger value="phone_number" className="xl:w-[494px] w-full">
            {t('phone_number')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plates">
          {isLoading || isPlatesLoading ? (
            <Spinner />
          ) : fullPlatesData.length === 0 ? (
            <FavEmpty />
          ) : (
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
              {fullPlatesData.map((plate) => (
                <PlateCard key={plate.id} plate={plate} />
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
                  sim={{ ...fav.favorable, is_favorite: true }}
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
