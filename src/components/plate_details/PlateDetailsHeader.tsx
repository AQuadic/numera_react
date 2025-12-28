// import Heart from "../icons/home/Heart";
import Share from "../icons/plates/Share";
import type { Plate } from "../../lib/api";
import { useTranslation } from "react-i18next";

interface PlateDetailsHeaderProps {
  plate: Plate;
}

const PlateDetailsHeader = ({ plate }: PlateDetailsHeaderProps) => {
  const { t } = useTranslation("home");
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-AE");
  };

  const getEmirateLabel = (emirateId: string) => {
    const labels: Record<string, string> = {
      abu_dhuabi: "Abu Dhabi",
      dubai: "Dubai",
      sharjah: "Sharjah",
      ajman: "Ajman",
      fujairah: "Fujairah",
      ras_alkhima: "Ras Al Khaimah",
      om_qauquan: "Umm Al Quwain",
    };
    return labels[emirateId] || emirateId;
  };

  return (
    <section className="container md:py-[58px] py-10">
      <div className="flex flex-wrap gap-6">
        <img
          src={plate.image_url}
          alt={`Plate ${plate.letters}${plate.numbers}`}
          className="md:w-[486px] w-full h-[287px] object-contain rounded-md bg-white border"
        />
        <div className="flex items-start justify-between flex-1">
          <div>
            <h2 className="text-[#192540] md:text-[40px] text-2xl font-medium">
              {plate.letters ? `${plate.letters} - ` : ""}
              {plate.numbers}
            </h2>
            <h2 className="text-[#966A08] md:text-2xl font-bold mt-3">
              {plate.price != null ? (
                <>
                  {formatPrice(plate.price)}{" "}
                  <span className="text-sm relative top-1">AED</span>
                </>
              ) : (
                t("price_on_request")
              )}
            </h2>

            {plate.is_negotiable && (
              <div className="mt-3">
                <span className="inline-block px-3 py-1 bg-[#E3F2FD] text-[#1976D2] text-sm font-medium rounded-full">
                  Negotiable
                </span>
              </div>
            )}

            <h3 className="text-[#192540] md:text-base font-medium mt-5">
              Plate Details
            </h3>
            <p className="text-[#717171] md:text-lg font-medium mt-5">
              Plate Number :{" "}
              <span className="text-[#192540] md:text-xl">
                {plate.letters ? `${plate.letters} ` : ""}
                {plate.numbers}
              </span>
            </p>

            <p className="text-[#717171] md:text-lg font-medium mt-4">
              Type :{" "}
              <span className="text-[#192540] md:text-xl">
                {getVehicleTypeLabel(plate.vehicle_type)}
              </span>
            </p>

            <p className="text-[#717171] md:text-lg font-medium mt-4">
              Emirate :{" "}
              <span className="text-[#192540] md:text-xl">
                {getEmirateLabel(plate.emirate_id)}
              </span>
            </p>

            <p className="text-[#717171] md:text-lg font-medium mt-4">
              Listed Date :{" "}
              <span className="text-[#192540] md:text-xl">
                {formatDate(plate.published_at)}
              </span>
            </p>

            {/* Views label removed per design: hide 'Views :' for single plate */}

            {plate.is_sold && (
              <div className="mt-4">
                <span className="inline-block px-4 py-2 bg-[#FFE5E5] text-[#D32F2F] text-base font-semibold rounded-md">
                  SOLD
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center md:gap-8 gap-4">
            <Share />
            {/* <Heart /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlateDetailsHeader;
