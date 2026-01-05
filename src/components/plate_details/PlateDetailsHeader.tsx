// import Heart from "../icons/home/Heart";
import Share from "../icons/plates/Share";
import type { Plate } from "../../lib/api";
import { useTranslation } from "react-i18next";
import Heart from "../icons/home/Heart";
import { useAuthStore } from "../../store";
import { useState } from "react";
import { toggleFavorite } from "../../lib/api/toggleFavorite";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface PlateDetailsHeaderProps {
  plate: Plate;
}

const PlateDetailsHeader = ({ plate }: PlateDetailsHeaderProps) => {
  const { t, i18n } = useTranslation("home");
  const user = useAuthStore((s) => s.user);
  const [isFavorited, setIsFavorited] = useState(plate.is_favorite ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE").format(price);
  };

  const getVehicleTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      classic: t("classic"),
      bikes: t("bikes"),
      cars: t("cars"),
      fun: t("fun"),
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t("today");
    if (diffDays === 1) return t("1_day_ago");
    if (diffDays < 7) return t("days_ago", { count: diffDays });
    if (diffDays < 30) return t("weeks_ago", { count: Math.floor(diffDays / 7) });
    
    return date.toLocaleDateString(i18n.language);
  };

  const getEmirateLabel = (emirateId: string) => {
    const labels: Record<string, string> = {
      abu_dhuabi: t("emirates.abu_dhuabi"),
      dubai: t("emirates.dubai"),
      sharjah: t("emirates.sharjah"),
      ajman: t("emirates.ajman"),
      fujairah: t("emirates.fujairah"),
      ras_alkhima: t("emirates.ras_alkhima"),
      om_qauquan: t("emirates.umm_al_quwain"),
    };
    return labels[emirateId] || emirateId;
  };

    const handleToggleFavorite = async (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
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

    const handleShare = async () => {
      const shareUrl = `${window.location.origin}/plate/${plate.id}/${plate.numbers}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: `Plate ${plate.letters ?? ""}${plate.numbers}`,
            url: shareUrl,
          });
          toast.success("Shared successfully!");
        } catch (err) {
          console.error("Error sharing:", err);
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast.success("Link copied to clipboard!");
        } catch (err) {
          console.error("Failed to copy link", err);
          toast.error("Failed to copy link");
        }
      }
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
              {plate.price ? (
                  <>
                    {formatPrice(plate.price)}{" "}
                    <span className="text-sm relative top-1">{t('aed')}</span>
                  </>
                ) : (
                  t("price_on_request")
                )}

            </h2>

            {plate.is_negotiable && (
              <div className="mt-3">
                <span className="inline-block px-3 py-1 bg-[#E3F2FD] text-[#1976D2] text-sm font-medium rounded-full">
                  {t('negotiable')}
                </span>
              </div>
            )}

            <h3 className="text-[#192540] md:text-base font-medium mt-5">
              {t('plate_details')}
            </h3>
            <p className="text-[#717171] md:text-lg font-medium mt-5">
              {t('plate_number')} {" "}
              <span className="text-[#192540] md:text-xl">
                {plate.letters ? `${plate.letters} ` : ""}
                {plate.numbers}
              </span>
            </p>

            <p className="text-[#717171] md:text-lg font-medium mt-4">
              {t('type')}{" "}
              <span className="text-[#192540] md:text-xl">
                {getVehicleTypeLabel(plate.vehicle_type)}
              </span>
            </p>

            <p className="text-[#717171] md:text-lg font-medium mt-4">
              {t('emirate')}{" "}
              <span className="text-[#192540] md:text-xl">
                {getEmirateLabel(plate.emirate_id)}
              </span>
            </p>

            <p className="text-[#717171] md:text-lg font-medium mt-4">
              {t('listed_date')}{" "}
              <span className="text-[#192540] md:text-xl">
                {formatDate(plate.published_at)}
              </span>
            </p>

            {/* Views label removed per design: hide 'Views :' for single plate */}

            {plate.is_sold && (
              <div className="mt-4">
                <span className="inline-block px-4 py-2 bg-[#FFE5E5] text-[#D32F2F] text-base font-semibold rounded-md">
                  {t('sold')}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center md:gap-8 gap-4">
            <button onClick={handleShare} className="cursor-pointer">
              <Share />
            </button>
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
        </div>
      </div>
    </section>
  );
};

export default PlateDetailsHeader;
