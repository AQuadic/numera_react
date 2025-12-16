import { Link } from "react-router";
import { useState } from "react";
import Heart from "../icons/home/Heart";
import type { Sim } from "../../lib/api";
import { toggleFavorite } from "../../lib/api/toggleFavorite";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store";

interface SimCardProps {
  sim: Sim;
}

const SimCard = ({ sim }: SimCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(sim.is_favorite ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
  
  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat("en-AE").format(price);
  // };
  const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;

    setIsFavorited(prev => !prev); 
    setIsLoading(true);

    try {
      await toggleFavorite({
        favorable_id: sim.id,
        favorable_type: "sim",
      });
      queryClient.invalidateQueries({ queryKey: ["favorites"] }); 
    } catch (error) {
      setIsFavorited(prev => !prev);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      to={`/phone_number_details/${sim.id}`}
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

      {/* Number Display */}
      <div className="mt-6 text-center">
        <h2 className="w-[199px] text-[#192540] text-2xl font-bold tracking-wider border-3 border-black py-4 rounded-2xl mx-auto">
          {sim.numbers}
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

      {/* Price and Action */}
      {/* <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
        <h2 className="text-[#192540] md:text-xl text-lg font-semibold">
          {formatPrice(sim.price)}{" "}
          <span className="md:text-sm text-xs relative md:top-1">AED</span>
        </h2>

        <div className="w-[147px] h-12 bg-[#EBAF29] rounded-[10px] text-[#192540] text-base font-semibold flex items-center justify-center hover:bg-[#d9a01f] transition-colors">
          View Details
        </div>
      </div> */}
      <button className="w-full h-12 bg-[#EBAF29] rounded-[10px] mt-6 text-[#192540] text-base font-semibold cursor-pointer">
          Price on request
      </button>
      {/* Negotiable tag removed from card */}
    </Link>
  );
};

export default SimCard;
