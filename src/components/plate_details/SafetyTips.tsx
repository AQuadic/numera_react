import Check from "../icons/plates/Check";
import Safety from "../icons/plates/Safety";

const tips = [
  "Always meet in public places.",
  "Verify seller identity and documents.",
  "Use secure payment methods.",
  "Report suspicious activity to NUMRA.",
];

const SafetyTips = () => {
    return (
        <section className="container md:py-10">
        <div className="flex items-center gap-2 mb-4">
            <Safety />
            <h2 className="text-[#192540] text-[32px] font-medium">Safety Tips</h2>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
            {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2">
                <Check />
                <p className="text-[#4B5563] text-base font-medium">{tip}</p>
            </div>
            ))}
        </div>
        </section>
    );
};

export default SafetyTips;
