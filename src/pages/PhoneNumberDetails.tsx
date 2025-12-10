import { useState, useEffect } from "react";
import { useParams } from "react-router";
import WhyChooseNumra from "../components/home/WhyChooseNumra";
import PhoneNumDetailsHeader from "../components/phone_number_details/PhoneNumDetailsHeader";
import PurchaseInstructions from "../components/plate_details/PurchaseInstructions";
import SafetyTips from "../components/plate_details/SafetyTips";
import { getSimById } from "../lib/api";
import type { Sim } from "../lib/api";

const PhoneNumberDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [sim, setSim] = useState<Sim | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSim = async () => {
      if (!id) {
        setError("SIM ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const simData = await getSimById(Number(id));
        setSim(simData);
      } catch (err) {
        console.error("Error fetching sim:", err);
        setError("Failed to load phone number details");
      } finally {
        setLoading(false);
      }
    };

    fetchSim();
  }, [id]);

  if (loading) {
    return (
      <div className="container md:py-[58px] py-10">
        <div className="animate-pulse">
          <div className="h-[427px] bg-gray-200 rounded-lg" />
          <div className="mt-8 h-8 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    );
  }

  if (error || !sim) {
    return (
      <div className="container md:py-[58px] py-10">
        <div className="text-center">
          <p className="text-[#717171] text-lg">
            {error || "Phone number not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PhoneNumDetailsHeader sim={sim} />
      <PurchaseInstructions />
      <SafetyTips />
      <WhyChooseNumra />
    </div>
  );
};

export default PhoneNumberDetails;
