"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { deleteUser } from "../../lib/api/deleteAccount";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store";
import { useTranslation } from "react-i18next";

interface DeleteAccountDialogProps {
  onClose: () => void;
}

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({ onClose }) => {
  const { t } = useTranslation("profile");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser();
      useAuthStore.getState().logout();
      onClose();
      navigate("/signin", { replace: true });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "An error occurred while deleting your account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/images/delete_account.png"
        alt={t("delete_account_image_alt")}
      />
      <h2 className="text-[#192540] text-2xl font-semibold mt-4">
        {t("delete_confirm_title")}
      </h2>
      <p className="text-[#717171] text-lg font-medium mt-4 text-center">
        {t("delete_confirm_desc")}
      </p>

      <div className="mt-7 flex items-center justify-between w-full gap-6">
        <button
          onClick={onClose}
          className="w-full h-14 border border-[#F0F0F0] rounded-md text-[#192540] text-lg font-semibold cursor-pointer"
          disabled={isDeleting}
        >
          {t("cancel")}
        </button>

        <button
          onClick={handleDelete}
          className="w-full h-14 bg-[#D71F1F] rounded-md text-[#FEFEFE] text-lg font-semibold cursor-pointer disabled:opacity-50"
          disabled={isDeleting}
        >
          {isDeleting ? t("deleting") : t("delete_account")}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountDialog;
