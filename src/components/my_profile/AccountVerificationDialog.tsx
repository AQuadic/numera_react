import { useState, useRef } from "react";
import Upload from "../icons/profile/Upload";
import toast from "react-hot-toast";

interface AccountVerificationDialogProps {
  onSubmit: () => void;
}

const AccountVerificationDialog: React.FC<AccountVerificationDialogProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type.startsWith("image/")
      ) {
        setFile(selectedFile);

        if (selectedFile.type.startsWith("image/")) {
          const url = URL.createObjectURL(selectedFile);
          setPreviewUrl(url);
        } else {
          setPreviewUrl(null);
        }
      } else {
        toast.error("Please upload a PNG, JPG, or PDF file.");
      }
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please upload your ID.");
      return;
    }

    const formData = new FormData();
    formData.append("id_document", file);
    formData.append("company_name", companyName);

    onSubmit();
  };

  return (
        <div className="max-h-[600px] overflow-scroll">
        <h2 className="text-[#192540] text-2xl font-medium">Account Verification</h2>
        <p className="text-[#717171] text-lg font-medium mt-4">
            To verify your identity, please upload your ID. Our team will review your submission and get back to you shortly.
        </p>

        <div className="mt-10">
            <label htmlFor="id" className="text-[#192540] text-base font-medium">Upload ID</label>
            <div
            onClick={handleDivClick}
            className="w-full h-[126px] border border-[#F0F0F0] rounded-md mt-4 flex flex-col items-center justify-center cursor-pointer"
            >
            <Upload />
            <p className="text-[#717171] text-sm font-normal mt-2">
                {file ? file.name : "Upload a png or pdf of your ID document"}
            </p>
            <input
                ref={fileInputRef}
                id="id"
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                className="hidden"
                onChange={handleFileChange}
            />
            </div>

            {/* Preview / file name */}
            {file && (
            <div className="mt-4">
                {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                ) : (
                <p className="text-[#717171] text-sm">{file.name}</p>
                )}
            </div>
            )}
        </div>

        <div className="px-2 mt-8">
            <label htmlFor="companyName" className="text-[#192540] text-base font-medium">
            Company Name
            </label>
            <input
            type="text"
            id="companyName"
            className="w-full h-12 border rounded-md mt-2 px-2"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            />
        </div>

        <button
            onClick={handleSubmit}
            className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold mt-8 cursor-pointer"
        >
            Submit
        </button>
        </div>
    );
};

export default AccountVerificationDialog;
