import { useState, useRef, useEffect } from "react";
import Upload from "../icons/profile/Upload";
import toast from "react-hot-toast";
import { updateUser, getErrorMessage } from "../../lib/api/auth";
import { useAuthStore } from "../../store";

interface AccountVerificationDialogProps {
  onSubmit: () => void;
}

const AccountVerificationDialog: React.FC<AccountVerificationDialogProps> = ({
  onSubmit,
}) => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const refetchUser = useAuthStore((s) => s.refetchUser);

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If user already submitted verification, disallow re-applying
  const alreadySubmitted = user?.verification_status === "submitted";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter((f) =>
        f.type.startsWith("image/")
      );

      if (selectedFiles.length === 0) {
        toast.error("Please upload image files (PNG or JPG).");
        return;
      }

      setFiles(selectedFiles);

      // Create preview URLs
      const urls = selectedFiles.map((f) => URL.createObjectURL(f));
      setPreviewUrls(urls);
    }
  };

  const handleDivClick = () => {
    if (alreadySubmitted) return;
    fileInputRef.current?.click();
  };

  // cleanup preview URLs on unmount or when previews change
  useEffect(() => {
    return () => {
      previewUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [previewUrls]);

  // Prefill company name from user if available
  useEffect(() => {
    if (user?.company_name) setCompanyName(user.company_name);
  }, [user]);

  const handleSubmit = async () => {
    if (alreadySubmitted) {
      toast("Your verification is already submitted and under review.");
      return;
    }

    if (files.length === 0) {
      toast.error("Please upload at least one image to verify.");
      return;
    }

    if (!companyName.trim()) {
      toast.error("Please enter your company name.");
      return;
    }

    const formData = new FormData();

    // Append attachments as an array: attachments[]
    files.forEach((f) => {
      formData.append("attachments[]", f);
    });

    formData.append("company_name", companyName.trim());

    try {
      setIsSubmitting(true);
      const res = await updateUser(formData);

      // Update local auth store if API returned updated user
      if (res && res.user) {
        setUser(res.user);
      } else {
        // Ensure we have fresh user data
        await refetchUser();
      }

      const newStatus =
        res?.user?.verification_status ??
        useAuthStore.getState().user?.verification_status ??
        null;

      if (newStatus === "submitted") {
        toast.success(
          "Verification submitted. Our team will review your attachments."
        );
        onSubmit();
      } else if (newStatus === "rejected") {
        // Show rejection explicitly and keep dialog open for user to reapply
        toast.error(
          "Verification was rejected. Please update your attachments or company name and resubmit."
        );
      } else {
        // Fallback success message
        toast.success("Verification submitted.");
        onSubmit();
      }
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg || "Failed to submit verification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-h-[600px] overflow-scroll">
      <h2 className="text-[#192540] text-2xl font-medium">
        Account Verification
      </h2>
      <p className="text-[#717171] text-lg font-medium mt-4">
        To verify your identity, please upload images of your ID or verification
        documents. Our team will review your submission and get back to you
        shortly.
      </p>

      {alreadySubmitted && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-[#856404] text-sm">
            Your verification has been submitted and is under review. You cannot
            reapply while it is pending.
          </p>
        </div>
      )}

      <div className="mt-10">
        <label
          htmlFor="attachments"
          className="text-[#192540] text-base font-medium"
        >
          Upload Attachments
        </label>
        <div
          onClick={handleDivClick}
          className="w-full min-h-[126px] border border-[#F0F0F0] rounded-md mt-4 flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload />
          <p className="text-[#717171] text-sm font-normal mt-2">
            {files.length > 0
              ? `${files.length} file(s) selected`
              : alreadySubmitted
              ? "Verification in progress"
              : "Click to select images (PNG or JPG)"}
          </p>
          <input
            ref={fileInputRef}
            id="attachments"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            multiple
            onChange={handleFileChange}
            disabled={alreadySubmitted}
          />
        </div>

        {/* Previews */}
        {previewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {previewUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Preview ${idx + 1}`}
                className="w-32 h-32 object-cover rounded-md"
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-2 mt-8">
        <label
          htmlFor="companyName"
          className="text-[#192540] text-base font-medium"
        >
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          className="w-full h-12 border rounded-md mt-2 px-2"
          placeholder={
            alreadySubmitted ? "Verification in progress" : "Enter company name"
          }
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          disabled={alreadySubmitted}
        />
      </div>

      {/* Sticky footer with submit button */}
      <div className="sticky bottom-0 left-0 right-0 bg-white py-4 mt-6 border-t border-[#F0F0F0]">
        <div className="px-2">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || alreadySubmitted}
            className={`w-full h-14 rounded-md text-[#192540] text-lg font-semibold ${
              isSubmitting || alreadySubmitted
                ? "bg-[#d6b75a] cursor-not-allowed"
                : "bg-[#EBAF29] cursor-pointer"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : alreadySubmitted
              ? "Under review"
              : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationDialog;
