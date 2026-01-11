import toast from "react-hot-toast";
import { updateUser } from "../../lib/api/auth";
import {
  useEffect,
  useState,
  type FC,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useAuthStore } from "../../store";
import type { UserImage } from "../../lib/api/auth";
import { PhoneInput, type PhoneValue } from "../compound/PhoneInput";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Photo from "../icons/profile/Photo";
import { useTranslation } from "react-i18next";
import { getResponsiveImageUrl } from "../../lib/utils/imageUtils";

const PersonalInformation: FC = () => {
  const { t, i18n } = useTranslation("profile");
  const [isUpdating, setIsUpdating] = useState(false);

  const user = useAuthStore((s) => s.user);
  const refetchUser = useAuthStore((s) => s.refetchUser);

  const [name, setName] = useState(() => user?.name ?? "");
  const [email, setEmail] = useState(() => user?.email ?? "");
  const [memberType, setMemberType] = useState<"personal" | "company">(
    (user?.type as "personal" | "company") ?? "personal"
  );
  const [companyName, setCompanyName] = useState(user?.company_name ?? "");
  const [phone, setPhone] = useState<PhoneValue>({
    code: "EG",
    number: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    getResponsiveImageUrl(user?.image as UserImage, "thumbnail")
  );

  // helper to derive initials from name
  const getInitials = (fullName?: string) => {
    const parts = (fullName || name || user?.name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone({
        code: user.phone_country || "EG",
        number: user.phone || "",
      });
      const type: "personal" | "company" =
        user.type === "company" ? "company" : "personal";
      setMemberType(type);
      setCompanyName(user.company_name || "");
      setImagePreview(
        getResponsiveImageUrl(user?.image as UserImage, "thumbnail")
      );
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || name.trim().length < 2) {
      toast.error("Please enter a valid name");
      return;
    }

    if (memberType === "company" && !companyName.trim()) {
      toast.error("Please enter company name");
      return;
    }

    // keep the user's currently saved image so we can revert to it if upload fails
    const previousSavedImage = getResponsiveImageUrl(
      user?.image as UserImage,
      "thumbnail"
    );

    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.number);
      formData.append("phone_country", phone.code);
      formData.append("type", memberType);
      if (memberType === "company")
        formData.append("company_name", companyName.trim());
      if (imageFile) formData.append("image", imageFile);

      await updateUser(formData);
      await refetchUser();
      toast.success(t("profile_updated"));
    } catch (err) {
      // axios interceptor handles toast; revert the image preview and clear the selected file
      setImageFile(null);
      // revert to the previously saved image (or null to show initials)
      setImagePreview(previousSavedImage);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="py-10">
      <h2 className="text-[#192540] text-2xl font-medium">
        {t("personal_information")}
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mt-10 flex items-center justify-center relative">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="owner image"
              className="w-[193px] h-[193px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[193px] h-[193px] rounded-full bg-[#F3F4F6] flex items-center justify-center text-4xl font-semibold text-[#192540]">
              {getInitials()}
            </div>
          )}

          <div className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="uploadPhoto"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);

                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const res = ev.target?.result;
                    if (typeof res === "string") setImagePreview(res);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label
              htmlFor="uploadPhoto"
              className="absolute top-16 ltr:-left-14 rtl:-right-14"
            >
              <Photo />
            </label>
          </div>
        </div>

        <div className="px-2 mt-6">
          <label htmlFor="name" className="text-[#192540] text-xl font-medium">
            {t("name")}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 border rounded-md mt-2 px-2"
            placeholder={t("enter_name")}
          />
        </div>

        <div className="px-2 mt-6">
          <label htmlFor="phone" className="text-[#192540] text-xl font-medium">
            {t("phone_number")}
          </label>
          <div className="mt-3">
            <PhoneInput value={phone} onChange={setPhone} />
          </div>
        </div>

        <div className="px-2 mt-6">
          <label htmlFor="email" className="text-[#192540] text-xl font-medium">
            {t("email")}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 border rounded-md mt-2 px-2"
            placeholder={t("enter_email")}
          />
        </div>

        <div className="px-2 mt-6">
          <h2 className="text-[#192540] text-xl font-medium">
            {t("membre_type")}
          </h2>
          <RadioGroup
            value={memberType}
            onValueChange={(value) => {
              if (value === "personal" || value === "company")
                setMemberType(value);
            }}
            className="flex md:gap-60 mt-4"
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="personal" id="option-one" />
              <label
                htmlFor="option-one"
                className="text-[#192540] text-lg font-medium"
              >
                {t("individuals")}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="company" id="option-two" />
              <label
                htmlFor="option-two"
                className="text-[#192540] text-lg font-medium"
              >
                {t("companies")}
              </label>
            </div>
          </RadioGroup>
        </div>

        {memberType === "company" && (
          <div className="px-2 mt-6">
            <label
              htmlFor="companyName"
              className="text-[#192540] text-xl font-medium"
            >
              {t("company_name")}
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full h-12 border rounded-md mt-2 px-2"
              placeholder={t("enter_company_name")}
            />
          </div>
        )}

        <div className="px-2 mt-6">
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full h-12 bg-[#EBAF29] rounded-md text-[#192540] text-base font-semibold cursor-pointer hover:bg-[#d9a025] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? t("saving") : t("save_changes")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
