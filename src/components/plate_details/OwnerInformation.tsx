import { Link } from "react-router";
// chat UI removed for single-item view
import Phone from "../icons/plates/Phone";
import Verified from "../icons/plates/Verified";
import Whatsapp from "../icons/plates/Whatsapp";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store";

interface UserImage {
  url: string;
}

interface User {
  id: number;
  name: string;
  email?: string;
  phone: string | null;
  phone_e164?: string | null;
  type: string;
  company_name: string | null;
  created_at?: string;
  verification_status: string | null;
  image?: UserImage | null;
}

interface OwnerInformationProps {
  user: User;
}

const OwnerInformation = ({ user }: OwnerInformationProps) => {
  const { t, i18n } = useTranslation("home");
  const getUserTypeLabel = (type: string) => {
    return type === "personal" ? t("individual_seller") : t("premium_dealer");
  };

  const sellerPhoneForWA = (user.phone_e164 ?? user.phone ?? "").replaceAll(
    "+",
    ""
  );

  const loggedUser = useAuthStore((s) => s.user);
  const isOwner =
  loggedUser?.id != null &&
  Number(loggedUser.id) === Number(user.id);

  const formattedDate = user.created_at
    ? new Intl.DateTimeFormat(
        i18n.language === "ar" ? "ar-EG" : "en-GB",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ).format(new Date(user.created_at))
    : t("unknown_date");

  return (
    <section className="container md:py-[58px] py-10">
      <h2 className="text-[#192540] text-[32px] font-medium">
        {t('owner_information')}
      </h2>
      <div className="mt-9 flex flex-wrap justify-between items-start">
        <div className="flex justify-between gap-3 bg-[#FDFAF3] px-2 py-3 md:w-1/2 rounded-md">
          <Link to={`/seller_profile/${user.id}`} className="flex items-center gap-3">
            <div className="w-[78px] h-[78px] rounded-full overflow-hidden bg-[#EBAF29] flex items-center justify-center">
              {user.image?.url ? (
                <img
                  src={user.image.url}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-[#192540] text-2xl font-medium">
                {user.name}
              </h2>
              <p className="text-[#717171] text-base font-medium mt-2">
                {getUserTypeLabel(user.type)}
              </p>
                <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                  <span>{t('member-since')}</span>
                  <span className="font-medium text-gray-500 text-xs">
                    {formattedDate}
                  </span>
                </p>
                              
            </div>
          </Link>

          {user.verification_status === "verified" && <Verified />}
        </div>

      {!isOwner && (
        <div className="flex flex-wrap justify-center items-center gap-6 mt-4 lg:mt-0">
          {user.phone_e164 && (
            <a
              href={`tel:${user.phone_e164}`}
              className="w-[180px] h-[102px] bg-[#192540] rounded-[10px] flex flex-col items-center justify-center gap-2 hover:bg-[#2a3650] transition-colors"
            >
              <Phone />
              <p className="text-[#FEFEFE] text-xl font-medium">
                {t("call")}
              </p>
            </a>
          )}

          {user.phone_e164 && (
            <a
              href={`https://wa.me/${sellerPhoneForWA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[180px] h-[102px] bg-[#19AA3D] rounded-[10px] flex flex-col items-center justify-center gap-2 hover:bg-[#158a32] transition-colors"
            >
              <Whatsapp />
              <p className="text-[#FEFEFE] text-xl font-medium">
                {t("whatsapp")}
              </p>
            </a>
          )}
        </div>
      )}
      </div>
    </section>
  );
};

export default OwnerInformation;
