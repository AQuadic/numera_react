"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { deleteUser } from "../../lib/api/deleteAccount";
import { useNavigate } from "react-router";

interface DeleteAccountDialogProps {
  onClose: () => void;
}

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({ onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteUser();
      if (result.success) {
        toast.success("Account deleted successfully!");
        onClose();
        navigate("/signin");
      } else {
        toast.error(result.message || "Failed to delete account");
      }
    } catch {
      toast.error("An error occurred while deleting your account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img 
        src="/images/delete_account.png"
        alt="delete account"
      />
      <h2 className="text-[#192540] text-2xl font-semibold mt-4">
        Are you sure you want to delete your account?
      </h2>
      <p className="text-[#717171] text-lg font-medium mt-4 text-center">
        By this action all your data and profile information will be removed.
      </p>

      <div className="mt-7 flex items-center justify-between w-full gap-6">
        <button
          onClick={onClose}
          className="w-full h-14 border border-[#F0F0F0] rounded-md text-[#192540] text-lg font-semibold cursor-pointer"
          disabled={isDeleting}
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          className="w-full h-14 bg-[#D71F1F] rounded-md text-[#FEFEFE] text-lg font-semibold cursor-pointer disabled:opacity-50"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountDialog;
