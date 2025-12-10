import Heart from "../icons/home/Heart";
import Call from "../icons/plates/Call";
import DialogWhatsapp from "../icons/plates/DialogWhatsapp";
import Share from "../icons/plates/Share";
import Verified from "../icons/plates/Verified";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { Sim } from "../../lib/api";

interface PhoneNumDetailsHeaderProps {
  sim: Sim;
}

const PhoneNumDetailsHeader = ({ sim }: PhoneNumDetailsHeaderProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE").format(price);
  };

  // Member since hidden for single-item view

  const getUserTypeLabel = (type: string) => {
    return type === "personal" ? "Individual Seller" : "Premium Dealer";
  };

  const sellerPhoneForWA = (
    sim.user.phone_e164 ??
    sim.user.phone ??
    ""
  ).replaceAll("+", "");

  return (
    <section className="container md:py-[58px] py-10">
      <div className="w-full min-h-[427px] bg-[#FDFAF3] rounded-lg p-8">
        <div className="flex items-center justify-between">
          {sim.is_negotiable ? (
            <h2 className="w-[126px] h-9 rounded-[20px] bg-[#E4FBEA] text-[#1E7634] text-xl font-medium flex items-center justify-center">
              negotiable
            </h2>
          ) : (
            <div className="w-[126px] h-9" />
          )}
          <div className="flex items-center gap-3">
            <Share />
            <Heart />
          </div>
        </div>
        <div
          className="w-full h-[73px] flex items-center justify-center text-[24px] font-semibold bg-white border border-[#4A4644] mt-7"
          style={{
            borderRadius: "40px / 20px",
            boxShadow: "inset 4.13px 4.13px 5.9px 0px #e7e7e7",
          }}
        >
          {sim.numbers}
        </div>

        {sim.is_sold && (
          <div className="mt-4 text-center">
            <span className="inline-block px-4 py-2 bg-[#FFE5E5] text-[#D32F2F] text-base font-semibold rounded-md">
              SOLD
            </span>
          </div>
        )}

        <h2 className="text-[#192540] text-2xl font-medium mt-8">
          Number Details
        </h2>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-[#717171] md:text-xl font-medium">Operator :</p>
          <div className="flex items-center gap-3">
            {sim.operator?.image?.url && (
              <img
                src={sim.operator.image.url}
                alt={sim.operator.name.en}
                className="h-8 object-contain"
              />
            )}
            <p className="text-[#192540] md:text-2xl font-semibold">
              {sim.operator.name.en}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[#717171] md:text-xl font-medium">
            Subscription Type :
          </p>
          <p className="text-[#192540] md:text-2xl font-semibold">
            {sim.subscription}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[#717171] md:text-xl font-medium">Package :</p>
          <p className="text-[#192540] md:text-2xl font-semibold">
            {sim.package}
          </p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger className="w-full">
          <button className="w-full h-14 bg-[#EBAF29] rounded-md mt-6 text-[#192540] text-lg font-semibold cursor-pointer hover:bg-[#d9a01f] transition-colors">
            {formatPrice(sim.price)} AED - Contact Seller
          </button>
        </DialogTrigger>
        <DialogContent className="md:w-[860px] w-full">
          <DialogHeader>
            <DialogTitle className="text-[#192540] text-2xl font-medium">
              Contact Seller
            </DialogTitle>
            <DialogDescription>
              <div>
                <div className="w-full h-[102px] bg-[#FDFAF3] rounded-md mt-4 py-3 md:px-6 px-2 flex justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-[78px] h-[78px] rounded-full bg-[#EBAF29] flex items-center justify-center text-white text-2xl font-bold">
                      {sim.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-[#192540] md:text-2xl font-medium">
                        {sim.user.name}
                      </h2>
                      <p className="text-[#717171] md:text-base font-medium">
                        {getUserTypeLabel(sim.user.type)}
                      </p>
                      {/* Member since hidden per single-item design */}
                    </div>
                  </div>

                  {sim.user.verification_status === "verified" && <Verified />}
                </div>

                <div className="mt-8">
                  {sim.user.phone_e164 && (
                    <a
                      href={`tel:${sim.user.phone_e164}`}
                      className="w-full h-14 bg-[#192540] rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#2a3650] transition-colors"
                    >
                      <Call />
                      <p className="text-[#FEFEFE] text-lg font-medium">Call</p>
                    </a>
                  )}

                  {sim.user.phone_e164 && (
                    <a
                      href={`https://wa.me/${sellerPhoneForWA}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-14 bg-[#19AA3D] rounded-[10px] flex items-center justify-center gap-2 mt-4 hover:bg-[#158a32] transition-colors"
                    >
                      <DialogWhatsapp />
                      <p className="text-[#FEFEFE] text-lg font-medium">
                        Whatsapp
                      </p>
                    </a>
                  )}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PhoneNumDetailsHeader;
