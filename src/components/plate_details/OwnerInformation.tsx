import { Link } from "react-router";
// chat UI removed for single-item view
import Phone from "../icons/plates/Phone";
import Verified from "../icons/plates/Verified";
import Whatsapp from "../icons/plates/Whatsapp";

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
}

interface OwnerInformationProps {
  user: User;
}

const OwnerInformation = ({ user }: OwnerInformationProps) => {
  const getUserTypeLabel = (type: string) => {
    return type === "personal" ? "Individual Seller" : "Premium Dealer";
  };

  const sellerPhoneForWA = (user.phone_e164 ?? user.phone ?? "").replaceAll(
    "+",
    ""
  );

  return (
    <section className="container md:py-[58px] py-10">
      <h2 className="text-[#192540] text-[32px] font-medium">
        Owner Information
      </h2>
      <div className="mt-9 flex flex-wrap justify-between items-start">
        <div className="flex items-center gap-3">
          <Link to={`/seller_profile/${user.id}`} className="flex items-center gap-3">
            <div className="w-[78px] h-[78px] rounded-full bg-[#EBAF29] flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-[#192540] text-2xl font-medium">
                {user.name}
              </h2>
              <p className="text-[#717171] text-base font-medium mt-2">
                {getUserTypeLabel(user.type)}
              </p>
              {/* Member since intentionally hidden for single-item owner display */}
            </div>
          </Link>

          {user.verification_status === "verified" && <Verified />}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 mt-4 lg:mt-0">
          {user.phone_e164 && (
            <a
              href={`tel:${user.phone_e164}`}
              className="w-[180px] h-[102px] bg-[#192540] rounded-[10px] flex flex-col items-center justify-center gap-2 hover:bg-[#2a3650] transition-colors"
            >
              <Phone />
              <p className="text-[#FEFEFE] text-xl font-medium">Call</p>
            </a>
          )}

          {/* chat button hidden as requested */}

          {user.phone_e164 && (
            <a
              href={`https://wa.me/${sellerPhoneForWA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[180px] h-[102px] bg-[#19AA3D] rounded-[10px] flex flex-col items-center justify-center gap-2 hover:bg-[#158a32] transition-colors"
            >
              <Whatsapp />
              <p className="text-[#FEFEFE] text-xl font-medium">WhatsApp</p>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default OwnerInformation;
