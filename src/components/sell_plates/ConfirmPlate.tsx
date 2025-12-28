import WhyChooseNumra from "../home/WhyChooseNumra";
import AddPlatesHeader from "./AddPlatesHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import GooglePlay from "../icons/plates/GooglePlay";
import AppStore from "../icons/plates/AppStore";
import { useTranslation } from "react-i18next";

const ConfirmPlate = () => {
  const { t } = useTranslation("home");

  return (
    <section className="container">
      <div>
        <AddPlatesHeader />
        <div className="w-full border border-[#F0F0F0] rounded-md p-3">
          <h2 className="text-[#192540] text-[32px] font-medium">
            Summary <span className="text-[#717171] text-xl">“Plate#1”</span>
          </h2>
          <div className="mt-6 flex items-center justify-between">
            <h2 className="text-[#192540] text-2xl font-medium">
              Plate Preview
            </h2>
            <img src="/images/plates/plate_img.png" alt="plate image" />
          </div>

          <div className="flex items-center justify-between mt-3">
            <p className="text-[#717171] text-2xl font-medium">Price :</p>
            <h3 className="text-[#192540] text-2xl font-bold mt-3">
              1,000,000 <span className="text-sm relative top-1">AED</span>
            </h3>
          </div>

          <div className="flex items-center justify-between mt-3">
            <p className="text-[#717171] text-2xl font-medium">Plan :</p>
            <h3 className="text-[#192540] text-2xl font-medium">Gold</h3>
          </div>
        </div>

        <Dialog>
          <DialogTrigger className="w-full">
            <button className="w-full h-14 bg-[#EBAF29] rounded-md mt-8 text-[#192540] text-lg font-semibold cursor-pointer md:mb-10">
              Publish All Plates
            </button>
          </DialogTrigger>
          <DialogContent className="w-[860px] px-0!">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <div className="flex items-center justify-between rtl:flex-row-reverse">
                  <div className="flex-1">
                    <h2 className="text-[#192540] text-[32px] font-medium px-8 text-left rtl:text-right">
                      {t("downloadApp.title")}
                    </h2>
                    <p className="text-[#717171] text-xl font-medium mt-6 px-8 text-left rtl:text-right">
                      {t("downloadApp.description")}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start rtl:md:justify-end gap-6 px-8 mt-8">
                      <GooglePlay />
                      <AppStore />
                    </div>
                  </div>

                  <div className="md:flex hidden">
                    <img src="/images/getApp.png" alt="get app" />
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <WhyChooseNumra />
    </section>
  );
};

export default ConfirmPlate;
