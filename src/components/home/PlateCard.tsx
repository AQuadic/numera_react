import { Link } from "react-router";
import { useState } from "react";
// import Heart from "../icons/home/Heart";
import type { Plate } from "../../lib/api";

interface PlateCardProps {
  plate: Plate;
}

const PlateCard = ({ plate }: PlateCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE").format(price);
  };

  const getVehicleTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      classic: "Classic",
      bikes: "Bikes",
      cars: "Cars",
      fun: "Fun",
    };
    return labels[type] || type;
  };

  return (
    <Link
      to={`/plate_details/${plate.id}`}
      className="md:w-[282px] w-full rounded-lg bg-[#F0F0F0] py-6 px-2 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-end">
        {/* <div
          className={`h-[30px] px-3 rounded-md font-medium flex items-center justify-center text-sm ${
            plate.is_sold
              ? "bg-[#FFE5E5] text-[#D32F2F]"
              : "bg-[#CFEAD6] text-[#1E7634]"
          }`}
        >
          {plate.is_sold ? "Sold" : "Available"}
        </div> */}
        {/* <Heart /> */}
      </div>
      <div className="mt-6 w-full min-h-[150px] h-auto bg-white rounded relative">
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
          className={`w-full min-h-[150px] h-auto object-contain bg-white transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-[#717171] md:text-sm text-xs font-medium">
          Type: <span>{getVehicleTypeLabel(plate.vehicle_type)}</span>
        </p>
        <p
          className={`md:text-sm text-xs font-medium ${
            plate.is_sold ? "text-[#D32F2F]" : "text-[#1E7634]"
          }`}
        >
          {plate.is_sold ? "Sold" : "Available"}
        </p>
      </div>

      <h2 className="text-[#192540] md:text-lg font-medium mt-3 truncate">
        {plate.letters ? `${plate.letters} - ` : ""}
        {plate.numbers}
      </h2>

      <div className="mt-3 flex items-center justify-between">
        <h2 className="text-[#192540] md:text-xl text-lg font-semibold">
          {formatPrice(plate.price)}{" "}
          <span className="md:text-sm text-xs relative md:top-1">AED</span>
        </h2>

        <div className="w-[147px] h-12 bg-[#EBAF29] rounded-[10px] text-[#192540] text-base font-semibold flex items-center justify-center hover:bg-[#d9a01f] transition-colors">
          View Details
        </div>
      </div>

      {/* Negotiable Badge: keep a placeholder so all cards maintain equal height */}
      {/* <div className="mt-3 text-center h-8 flex items-center justify-center">
        {plate.is_negotiable ? (
          <span className="inline-block px-3 py-1 bg-[#E3F2FD] text-[#1976D2] text-xs font-medium rounded-full">
            Negotiable
          </span>
        ) : (
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full invisible">
            Negotiable
          </span>
        )}
      </div> */}
    </Link>
  );
};

export default PlateCard;
