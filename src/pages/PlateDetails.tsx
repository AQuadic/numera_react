import { useState, useEffect } from "react";
import { useParams } from "react-router";
import WhyChooseNumra from "../components/home/WhyChooseNumra";
import OwnerInformation from "../components/plate_details/OwnerInformation";
import PlateDetailsHeader from "../components/plate_details/PlateDetailsHeader";
import PurchaseInstructions from "../components/plate_details/PurchaseInstructions";
import SafetyTips from "../components/plate_details/SafetyTips";
import { getPlateById } from "../lib/api";
import type { Plate } from "../lib/api";

const PlateDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [plate, setPlate] = useState<Plate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlate = async () => {
      if (!id) {
        setError("Plate ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const plateData = await getPlateById(Number(id));
        setPlate(plateData);
      } catch (err) {
        console.error("Error fetching plate:", err);
        setError("Failed to load plate details");
      } finally {
        setLoading(false);
      }
    };

    fetchPlate();
  }, [id]);

  if (loading) {
    return (
      <div className="container md:py-[58px] py-10">
        <div className="animate-pulse">
          <div className="h-[287px] bg-gray-200 rounded-md" />
          <div className="mt-8 h-8 bg-gray-200 rounded w-1/3" />
          <div className="mt-4 h-6 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    );
  }

  if (error || !plate) {
    return (
      <div className="container md:py-[58px] py-10">
        <div className="text-center">
          <p className="text-[#717171] text-lg">{error || "Plate not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PlateDetailsHeader plate={plate} />
      <OwnerInformation user={plate.user} />
      <PurchaseInstructions />
      <SafetyTips />
      <WhyChooseNumra />
    </div>
  );
};

export default PlateDetails;
