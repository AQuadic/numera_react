import { Link } from "react-router";
import { useState } from "react";
import Heart from "../icons/home/Heart";
import type { Sim } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store";
import { useTranslation } from "react-i18next";
import { getFavorites } from "../../lib/api/getFavorites";
import { useToggleFavorite } from "../../hooks/useToggleFavorite";

interface SimCardProps {
  sim: Sim;
}

const SimCard = ({ sim }: SimCardProps) => {
  const { t } = useTranslation("home");
  const [imageLoaded, setImageLoaded] = useState(false);
  const { mutate: toggleFav } = useToggleFavorite();
  const user = useAuthStore((s) => s.user);
  const isOwner = user?.id === sim.user_id || user?.id === sim.user?.id;

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: !!user,
  });

  const isFavorited = favorites
    ? favorites.some(
        (fav) => fav.favorable_type === "sim" && fav.favorable_id === sim.id
      )
    : sim.is_favorite ?? false;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE").format(price);
  };
  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFav({
      favorable_id: sim.id,
      favorable_type: "sim",
      favorableData: sim,
    } as any);
  };

  return (
    <Link
      to={`/sim/${sim.id}`}
      className="md:w-[282px] w-full rounded-lg py-6 px-2 hover:shadow-lg transition-shadow border"
    >
      <div className="flex items-center justify-between">
        {/* Operator Logo */}
        <div className="flex items-center justify-center h-6 relative">
          {!imageLoaded && sim.operator?.image?.url && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded animate-pulse">
              <img
                src="/images/header/numra_logo.png"
                alt="Loading"
                className="w-16 h-16 object-contain opacity-30"
              />
            </div>
          )}
          {sim.operator?.image?.url && (
            <img
              src={sim.operator.image.url}
              alt={sim.operator.name.en}
              className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          )}
        </div>
        {user && !isOwner && (
          <button
            onClick={handleToggleFavorite}
            className="cursor-pointer z-10"
          >
            <Heart active={isFavorited} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mt-6 gap-2">
        <div
          className={`flex-1 h-6 rounded-md font-medium flex items-center justify-center text-[10px] ${
            sim.is_sold ? "text-[#D32F2F]" : "text-[#1E7634]"
          }`}
          style={{
            backgroundImage: sim.is_sold
              ? 'url("/images/plates/sold_img.png")'
              : 'url("/images/plates/available_img.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {sim.is_sold ? t("sold") : t("available")}
        </div>

        {sim.is_negotiable && (
          <div className="flex-1 h-6 rounded-[20px] bg-[#E4FBEA] text-[#1E7634] text-[10px] font-medium flex items-center justify-center border border-[#1E7634]">
            {t("negotiable")}
          </div>
        )}
      </div>

      {/* Number Display */}
      <div className="mt-6 text-center">
        <h2 className="w-full max-w-[199px] text-[#192540] text-2xl font-bold tracking-wider border-3 border-black py-4 rounded-2xl mx-auto truncate px-2">
          {sim.numbers.length > 14
            ? sim.numbers.slice(0, 14) + "..."
            : sim.numbers}
        </h2>
      </div>

      {/* Details */}
      {/* <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <p className="text-[#717171] font-medium">Package:</p>
          <p className="text-[#192540] font-medium truncate ml-2">
            {sim.package}
          </p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <p className="text-[#717171] font-medium">Subscription:</p>
          <p className="text-[#192540] font-medium truncate ml-2">
            {sim.subscription}
          </p>
        </div>
      </div> */}

      <div className="mt-6 flex gap-2 items-center justify-between">
        <h2 className="text-[#192540] md:text-sm text-[10px] font-semibold">
          {sim.price && sim.price > 0 ? (
            <>
              {formatPrice(sim.price)}{" "}
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
    </Link>
  );
};

export default SimCard;
