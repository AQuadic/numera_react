import { Link } from "react-router";
import React, { useState } from "react";
import Heart from "../icons/home/Heart";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store";
import { useTranslation } from "react-i18next";
import { getImgProps, getPlateImageUrl } from "../../lib/utils/imageUtils";
import { getFavorites } from "../../lib/api/getFavorites";
import { useToggleFavorite } from "../../hooks/useToggleFavorite";

interface PlateCardProps {
  plate: any;
}

const PlateCard = ({ plate }: PlateCardProps) => {
  const { t } = useTranslation("home");
  const [imageLoaded, setImageLoaded] = useState(false);
  const { mutate: toggleFav } = useToggleFavorite();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE").format(price);
  };

  const packageName = plate.package_user?.package?.name?.en ?? "Free";
  const user = useAuthStore((s) => s.user);
  const isOwner = user?.id === plate.user_id || user?.id === plate.user?.id;

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: !!user,
  });

  const isFavorited = favorites
    ? favorites.some(
        (fav) => fav.favorable_type === "plate" && fav.favorable_id === plate.id
      )
    : plate.is_favorite ?? false;

  const badgeStyle =
    packageName === "Gold"
      ? { background: "linear-gradient(90deg, #EBAF29 0%, #FACC15 100%)" }
      : packageName === "Silver"
      ? {
          background:
            "linear-gradient(90deg, rgba(138,138,138,0.5) 23.87%, #F0F0F0 100%)",
        }
      : packageName === "Free"
      ? {
          background:
            "linear-gradient(90deg, rgba(138,138,138,0.5) 23.87%, #F0F0F0 100%)",
        }
      : null;

  const borderGradient =
    packageName === "Gold"
      ? "linear-gradient(90deg, #EBAF29 0%, #FACC15 100%)"
      : packageName === "Silver" || packageName === "Free"
      ? "linear-gradient(90deg, rgba(138,138,138,0.5) 23.87%, #F0F0F0 100%)"
      : "#8A8A8A";

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFav({
      favorable_id: plate.id,
      favorable_type: "plate",
      favorableData: plate,
    } as any);
  };

  return (
    <Link
      to={`/plate/${plate.id}`}
      className="md:w-[274px] w-full rounded-md hover:shadow-lg transition-shadow relative"
    >
      <div className="rounded-md p-px" style={{ background: borderGradient }}>
        <div className="bg-white rounded-md h-full w-full py-4 px-2 relative">
          {user && !isOwner && (
            <button
              onClick={handleToggleFavorite}
              className="cursor-pointer absolute top-4 end-2 z-10"
            >
              <Heart active={isFavorited} />
            </button>
          )}
          {packageName !== "Free" && badgeStyle && (
            <div
              style={badgeStyle}
              className="w-[92px] h-8 rounded-lg py-2 px-4 text-[#192540] text-base font-semibold absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center"
            >
              {t(`packages.${packageName}`)}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 gap-2">
            <div
              className={`flex-1 h-6 rounded-md font-medium flex items-center justify-center text-[10px] ${
                plate.is_sold ? "text-[#D32F2F]" : "text-[#1E7634]"
              }`}
              style={{
                backgroundImage: plate.is_sold
                  ? 'url("/images/plates/sold_img.png")'
                  : 'url("/images/plates/available_img.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {plate.is_sold ? t("sold") : t("available")}
            </div>

            {plate.is_negotiable && (
              <div className="flex-1 h-6 rounded-[20px] bg-[#E4FBEA] text-[#1E7634] text-[10px] font-medium flex items-center justify-center border border-[#1E7634]">
                {t("negotiable")}
              </div>
            )}
          </div>

          <div className="mt-6 w-full h-[54px] bg-white rounded relative">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded animate-pulse">
                <img
                  src="/images/header/numra_logo.png"
                  alt="Loading"
                  className="w-20 h-20 object-contain opacity-30"
                />
              </div>
            )}
            <img
              {...getImgProps(
                plate.image || {
                  url: plate.image_url || getPlateImageUrl(plate),
                  responsive_urls: [],
                },
                `Plate ${plate.letters}${plate.numbers}`,
                "small"
              )}
              className={`w-full h-[54px] object-contain bg-white transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>

          <div className="mt-6 flex gap-2 items-center justify-between">
            <h2 className="text-[#192540] md:text-sm text-[10px] font-semibold">
              {plate.price && plate.price > 0 ? (
                <>
                  {formatPrice(plate.price)}{" "}
                  <span className="text-xs relative md:top-1">{t("aed")}</span>
                </>
              ) : (
                t("price_on_request")
              )}
            </h2>

            <div className="md:w-[147px] w-full md:h-12 h-8 bg-[#EBAF29] rounded-[10px] text-[#192540] md:text-base text-xs font-semibold flex items-center justify-center hover:bg-[#d9a01f] transition-colors">
              {t("view_details")}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlateCard;
