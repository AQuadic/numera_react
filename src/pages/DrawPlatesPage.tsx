import WhyChooseNumra from "../components/home/WhyChooseNumra";
import DrawPlatesPattern from "../components/draw_plates/DrawPlatesPattern";

const DrawPlatesPage = () => {
  return (
    <div className="md:py-[35px]">
      <div className="flex gap-6 relative">
        <DrawPlatesPattern />
      </div>

      <WhyChooseNumra />
    </div>
  );
};

export default DrawPlatesPage;
