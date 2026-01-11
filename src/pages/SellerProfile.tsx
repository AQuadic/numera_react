import { useParams } from "react-router";
import { useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getSellerProfile,
  type SellerProfile as SellerProfileType,
} from "../lib/api/getSellerProfile";
import {
  getSellerCount,
  type SellerCountResponse,
} from "../lib/api/getSellerCount";

import WhyChooseNumra from "../components/home/WhyChooseNumra";
// import Filter from "../components/icons/home/Filter"
// import Search from "../components/icons/home/Search"
// import Chat from "../components/icons/plates/Chat"
import Phone from "../components/icons/plates/Phone";
import Verified from "../components/icons/plates/Verified";
import Whatsapp from "../components/icons/plates/Whatsapp";
import Spinner from "../components/icons/general/Spinner";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store";
import { getImgProps } from "../lib/utils/imageUtils";
import Car from "../components/icons/home/Car";
import Bike from "../components/icons/home/Bike";
import { getUserPlates, type Plate } from "../lib/api/getUserPlates";
import { getSims, type Sim, type PaginatedResponse } from "../lib/api";
import PlateCard from "../components/home/PlateCard";
import SimCard from "../components/home/SimCard";
import NoPlatesEmptyState from "../components/home/NoPlatesEmptyState";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const SellerProfile = () => {
  const { t, i18n } = useTranslation("home");
  const { userId } = useParams<{ userId: string }>();
  const id = Number(userId);
  const { user } = useAuthStore();
  const isOwnerProfile = user?.id === id;
  const isRtl = i18n.language === "ar";

  const [selectedType, setSelectedType] = useState<string>("cars");

  const getInitials = (fullName?: string | null) => {
    const parts = (fullName || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery<SellerProfileType>({
    queryKey: ["sellerProfile", id],
    queryFn: () => getSellerProfile(id),
    enabled: !!id,
  });

  const { data: counts, isLoading: isCountsLoading } =
    useQuery<SellerCountResponse>({
      queryKey: ["sellerCounts", id],
      queryFn: () => getSellerCount(id),
      enabled: !!id,
    });

  const {
    data: itemsData,
    isLoading: isItemsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedResponse<Plate | Sim>>({
    queryKey: ["sellerItems", id, selectedType],
    queryFn: async ({ pageParam = 1 }) => {
      if (selectedType === "sims") {
        const response = await getSims({
          page: pageParam as number,
          user_id: id,
        });
        return response as PaginatedResponse<Plate | Sim>;
      }
      const response = await getUserPlates(
        id,
        pageParam as number,
        selectedType
      );
      return response as PaginatedResponse<Plate | Sim>;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined,
    enabled: !!id,
  });

  if (isProfileLoading || isCountsLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner />
      </div>
    );

  if (isProfileError || !profile)
    return <div className="text-center py-20">Failed to load profile.</div>;

  const categories = [
    {
      title: t("car_plates"),
      bg: "#ECEDEF",
      textColor: "#192540",
      icon: <Car />,
      type: "cars",
    },
    {
      title: t("fun"),
      bg: "#FCF8ED",
      textColor: "#966A08",
      icon: <Bike />,
      type: "fun",
    },
    {
      title: t("mobile_numbers"),
      bg: "#F1FCEE",
      textColor: "#154D23",
      icon: <Phone />,
      type: "sims",
    },
  ];

  const allItems: (Plate | Sim)[] = itemsData
    ? itemsData.pages.reduce<(Plate | Sim)[]>(
        (acc, page) => [...acc, ...page.data],
        []
      )
    : [];

  const renderItems = (items: (Plate | Sim)[]) => {
    if (isItemsLoading)
      return (
        <div className="flex items-center justify-center py-10">
          <Spinner />
        </div>
      );

    if (!items.length) return <NoPlatesEmptyState />;

    return (
      <>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-10 justify-items-center">
          {items.map((item) =>
            selectedType === "sims" ? (
              <SimCard key={item.id} sim={item as Sim} />
            ) : (
              <PlateCard key={item.id} plate={item as Plate} />
            )
          )}
        </div>
        {hasNextPage && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-6 py-2 bg-[#192540] text-white rounded-md disabled:opacity-50"
            >
              {isFetchingNextPage ? <Spinner /> : t("load_more")}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <section className="md:py-[58px] text-start" dir={isRtl ? "rtl" : "ltr"}>
      {/* <div className="flex items-center gap-6">
                <div className="relative">
                        <input 
                            type="text"
                            className="lg:w-[996px] w-full h-14 border border-[#F0F0F0] rounded-md px-12"
                            placeholder="Search"
                        />
                        <div className="absolute top-4 left-4">
                            <Search />
                        </div>
                    </div>

                <div className="lg:w-[180px] w-full h-14 border border-[#F0F0F0] rounded-md flex items-center justify-center gap-3">
                    <p className="text-[#717171] font-semibold">Filter</p>
                    <Filter />
                </div>
            </div> */}

      <div className="container mt-[58px] w-full p-6 bg-[#F0F0F0] rounded-md flex flex-col items-center justify-center">
        {profile.image?.url ? (
          <img
            {...getImgProps(profile.image, profile.name, "thumbnail")}
            className="w-[167px] h-[167px] rounded-full object-cover"
          />
        ) : (
          <div className="w-[167px] h-[167px] rounded-full bg-[#FEFEFE] flex items-center justify-center text-4xl font-semibold text-[#192540]">
            {getInitials(profile.name)}
          </div>
        )}
        <div className="mt-4 flex items-center gap-3">
          <h2 className="text-[#192540] text-2xl font-medium">
            {profile.name}
          </h2>
          <Verified />
        </div>

        <p className="text-[#717171] text-base font-medium mt-2">
          {profile.type === "personal"
            ? t("individual_seller")
            : profile.company_name
            ? profile.company_name
            : t("premium_dealer")}
        </p>
        <p className="text-[#717171] text-base font-medium mt-1">
          {t("member_since", {
            year: new Date(profile.created_at).getFullYear(),
          })}
        </p>
        {!isOwnerProfile && profile.phone && (
          <div className="flex flex-wrap justify-center items-center gap-6 mt-4 lg:mt-6">
            <a
              href={`tel:${profile.phone}`}
              className="w-[180px] h-[102px] bg-[#192540] rounded-[10px] flex flex-col items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <Phone />
              <p className="text-[#FEFEFE] text-xl font-medium">{t("call")}</p>
            </a>

            <a
              href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[180px] h-[102px] bg-[#19AA3D] rounded-[10px] flex flex-col items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <Whatsapp />
              <p className="text-[#FEFEFE] text-xl font-medium">
                {t("whatsapp")}
              </p>
            </a>
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center gap-6 mt-4 lg:mt-6">
          <div className="w-[180px] h-[75px] bg-[#FEFEFE] rounded-[10px] flex flex-col items-center justify-center gap-1">
            <p className="text-[#192540] text-xl font-medium">
              {counts?.total ?? "-"}
            </p>
            <p className="text-[#717171] text-base font-medium">
              {t("total_plates")}
            </p>
          </div>

          <div className="w-[180px] h-[75px] bg-[#FEFEFE] rounded-[10px] flex flex-col items-center justify-center gap-1">
            <p className="text-[#EBAF29] text-xl font-medium">
              {counts?.premium ?? "-"}
            </p>
            <p className="text-[#717171] text-base font-medium">
              {t("premium")}
            </p>
          </div>

          <div className="w-[180px] h-[75px] bg-[#FEFEFE] rounded-[10px] flex flex-col items-center justify-center gap-1">
            <p className="text-[#192540] text-xl font-medium">
              {counts?.sold ?? "-"}
            </p>
            <p className="text-[#717171] text-base font-medium">{t("sold")}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 container">
        <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">
          {t("categories")}
        </h2>
        <div className="mt-8 flex flex-wrap gap-6">
          {categories.map((item) => (
            <button
              key={item.title}
              onClick={() => setSelectedType(item.type)}
              className={`md:w-[384px] w-full h-[134px] rounded-md flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-shadow border-2 ${
                selectedType === item.type
                  ? "border-[#192540]"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: item.bg }}
            >
              {item.icon}
              <p
                className="md:text-2xl text-xl font-semibold"
                style={{ color: item.textColor }}
              >
                {item.title}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-12">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-[#FDFAF3] py-8 rounded-[74px] w-full flex justify-center gap-6 mb-8">
              <TabsTrigger
                value="all"
                className="px-8 py-2 data-[state=active]:bg-[#192540] data-[state=active]:text-white rounded-full"
              >
                {t("all")}
              </TabsTrigger>
              <TabsTrigger
                value="premium"
                className="px-8 py-2 data-[state=active]:bg-[#192540] data-[state=active]:text-white rounded-full"
              >
                {t("premium")}
              </TabsTrigger>
              <TabsTrigger
                value="sold"
                className="px-8 py-2 data-[state=active]:bg-[#192540] data-[state=active]:text-white rounded-full"
              >
                {t("sold")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">{renderItems(allItems)}</TabsContent>
            <TabsContent value="premium">
              {renderItems(
                allItems.filter((item: Plate | Sim) => {
                  if ("package_user" in item)
                    return (
                      (item as Plate).package_user?.package?.name?.en !== "Free"
                    );
                  if ("package" in item)
                    return (item as Sim).package !== "Free";
                  return false;
                })
              )}
            </TabsContent>
            <TabsContent value="sold">
              {renderItems(
                allItems.filter((item: Plate | Sim) => item.is_sold)
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <WhyChooseNumra />
    </section>
  );
};

export default SellerProfile;
