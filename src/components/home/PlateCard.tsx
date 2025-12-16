import { Link } from "react-router";
import React, { useState } from "react";
import Heart from "../icons/home/Heart";
import type { Plate } from "../../lib/api";
import { toggleFavorite } from "../../lib/api/toggleFavorite";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store";

interface PlateCardProps {
  plate: Plate;
}

const PlateCard = ({ plate }: PlateCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(plate.is_favorite ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE").format(price);
  };

  const packageName = plate.package_user?.package?.name?.en ?? "Free";
  const user = useAuthStore((s) => s.user);

  const badgeStyle =
    packageName === "Gold"
      ? { background: "linear-gradient(90deg, #EBAF29 0%, #FACC15 100%)" }
      : packageName === "Silver"
      ? { background: "linear-gradient(90deg, rgba(138,138,138,0.5) 23.87%, #F0F0F0 100%)" }
      : packageName === "Free"
      ? { background: "linear-gradient(90deg, rgba(138,138,138,0.5) 23.87%, #F0F0F0 100%)" }
      : null;

  const borderGradient =
    packageName === "Gold"
      ? "linear-gradient(90deg, #EBAF29 0%, #FACC15 100%)"
      : packageName === "Silver" || packageName === "Free"
      ? "linear-gradient(90deg, rgba(138,138,138,0.5) 23.87%, #F0F0F0 100%)"
      : "#8A8A8A";

    const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading) return;
      setIsFavorited((prev) => !prev);

      try {
        setIsLoading(true);
        const res = await toggleFavorite({
          favorable_id: plate.id,
          favorable_type: "plate",
        });
        setIsFavorited(res.is_favorited);
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
      } catch (error) {
        setIsFavorited((prev) => !prev);
        console.error("Failed to toggle favorite", error);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <Link
      to={`/plate_details/${plate.id}`}
      className="md:w-[274px] w-full rounded-md hover:shadow-lg transition-shadow relative"
    >
      <div
        className="rounded-md p-px"
        style={{ background: borderGradient }}
      >
        <div className="bg-white rounded-md h-full w-full py-4 px-2 relative">
          {packageName !== "Free" && badgeStyle && (
            <div
              style={badgeStyle}
              className="w-[92px] h-8 rounded-lg py-2 px-4 text-[#192540] text-base font-semibold absolute -top-4 left-22 flex items-center justify-center"
            >
              {packageName}
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div
              className={`w-1/2 rounded-md font-medium flex items-center justify-center text-sm ${
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
              {plate.is_sold ? "Sold" : "Available"}
            </div>

            {user && (
              <button
                onClick={handleToggleFavorite}
                disabled={isLoading}
                className="cursor-pointer"
              >
            <Heart active={isFavorited} />
          </button>
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
              src={plate.image_url}
              alt={`Plate ${plate.letters}${plate.numbers}`}
              className={`w-full h-[54px] object-contain bg-white transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>

          <div className="mt-6 flex gap-2 items-center justify-between">
            <h2 className="text-[#192540] md:text-xl text-lg font-semibold">
              {formatPrice(plate.price)}{" "}
              <span className="text-xs relative md:top-1">AED</span>
            </h2>

            <div className="w-[147px] h-12 bg-[#EBAF29] rounded-[10px] text-[#192540] text-base font-semibold flex items-center justify-center hover:bg-[#d9a01f] transition-colors">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlateCard;
