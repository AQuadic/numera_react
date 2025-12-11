import { Link } from "react-router";
import { useState } from "react";
import Heart from "../icons/home/Heart";
import type { Sim } from "../../lib/api";

interface SimCardProps {
  sim: Sim;
}

const SimCard = ({ sim }: SimCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE").format(price);
  };

  return (
    <Link
      to={`/phone_number_details/${sim.id}`}
      className="md:w-[282px] w-full rounded-lg bg-[#F0F0F0] py-6 px-2 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between">
        {sim.is_sold ? (
          <div className="h-[30px] px-3 rounded-md font-medium flex items-center justify-center text-sm bg-[#FFE5E5] text-[#D32F2F]">
            Sold
          </div>
        ) : (
          <div />
        )}
        <Heart />
      </div>

      {/* Operator Logo */}
      <div className="mt-6 flex items-center justify-center h-24 relative">
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

      {/* Number Display */}
      <div className="mt-6 text-center">
        <h2 className="text-[#192540] text-2xl font-bold tracking-wider">
          {sim.numbers}
        </h2>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2">
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
      </div>

      {/* Price and Action */}
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-[#192540] md:text-xl text-lg font-semibold">
          {formatPrice(sim.price)}{" "}
          <span className="md:text-sm text-xs relative md:top-1">AED</span>
        </h2>

        <div className="w-[147px] h-12 bg-[#EBAF29] rounded-[10px] text-[#192540] text-base font-semibold flex items-center justify-center hover:bg-[#d9a01f] transition-colors">
          View Details
        </div>
      </div>

      {/* Negotiable tag removed from card */}
    </Link>
  );
};

export default SimCard;
