import { useQuery } from "@tanstack/react-query";
import PlateCard from "../home/PlateCard";
import SimCard from "../home/SimCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getFavorites } from "../../lib/api/getFavorites";
import FavEmpty from "./FavEmpty";
import Spinner from "../icons/general/Spinner";
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

  return (
    <section className="py-12">
      <h2 className="text-[#192540] text-2xl font-medium">{t("favorites")}</h2>

      <Tabs defaultValue="plates" className="flex items-center justify-center">
        <TabsList className="bg-[#FDFAF3] flex items-center justify-center mt-13 md:gap-[68px] mb-12 py-8 px-8 rounded-[74px]">
          <TabsTrigger value="plates" className="xl:w-[494px] w-full">
            {t("plates")}
          </TabsTrigger>
          <TabsTrigger value="phone_number" className="xl:w-[494px] w-full">
            {t("phone_number")}
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
                  key={fav.favorable?.id ?? fav.id}
                  plate={{ ...fav.favorable, is_favorite: true }}
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
