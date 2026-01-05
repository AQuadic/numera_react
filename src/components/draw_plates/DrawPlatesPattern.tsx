import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { X } from "lucide-react";

type PlateData = {
  emirate: string;
  letters: string;
  numbers: string;
  price: string;
};

const DrawPlatesPattern = () => {
  const plateContainerRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState("black");
  const [barColor, setBarColor] = useState("white");
  const [details, setDetails] = useState("");
  const [mobile, setMobile] = useState("");
  const [price, setPrice] = useState("");

  const [emirate, setEmirate] = useState("");
  const [numbers, setNumbers] = useState("");
  const [letters, setLetters] = useState("");
  const [plateImg, setPlateImg] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Direct URL to the plate image (cross-origin, for display only)
  const { t } = useTranslation("draw");
  const [plates, setPlates] = useState<PlateData[]>([
    { emirate: "", letters: "", numbers: "", price: "" },
  ]);

  const plateBaseUrl = "https://numra.motofy.io";

  const addPlate = () => {
    setPlates((prev) => [
      ...prev,
      { emirate: "", letters: "", numbers: "", price: "" },
    ]);
  };

  const removePlate = (index: number) => {
    setPlates((prev) => prev.filter((_, i) => i !== index));
  };

  const getContrastTextClass = (color: string) => {
    if (!color) return "text-black";
    const c = color.toLowerCase().trim();
    if (c === "white" || c === "#fff" || c === "#ffffff") return "text-black";
    if (c === "black" || c === "#000" || c === "#000000") return "text-white";

    // hex color
    let hex = c;
    if (hex.startsWith("#")) hex = hex.slice(1);
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((ch) => ch + ch)
        .join("");
    if (/^[0-9a-f]{6}$/i.test(hex)) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      // perceived brightness (0-255)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? "text-black" : "text-white";
    }

    // rgb(...) format
    if (c.startsWith("rgb")) {
      const nums = c
        .replace(/[^0-9,]/g, "")
        .split(",")
        .map((n) => Number(n));
      if (nums.length >= 3) {
        const [r, g, b] = nums;
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? "text-black" : "text-white";
      }
    }

    return "text-black";
  };

  useEffect(() => {
    if (
      !emirate?.toString().trim() ||
      !numbers?.toString().trim() ||
      !letters?.toString().trim()
    ) {
      setPlateImg("");
      return;
    }

    // The endpoint returns the image directly, so use the URL as the src
    const imgUrl = `${plateBaseUrl}/plate-generate/cars/${letters}/${numbers}/${emirate}`;
    setPlateImg(imgUrl);
  }, [emirate, letters, numbers]);

  const handleDownload = async () => {
    if (!plateContainerRef.current) return;

    setIsDownloading(true);

    try {
      // Get dimensions from the container
      const container = plateContainerRef.current;
      const rect = container.getBoundingClientRect();
      const scale = 2; // High resolution
      const width = rect.width * scale;
      const height = rect.height * scale;

      // Create canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Scale for high resolution
      ctx.scale(scale, scale);

      // Draw background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw plate image if we have one - fetch via proxy to avoid CORS
      if (plateImg) {
        try {
          // Fetch the image through the Vite dev proxy (same-origin)
          const proxyUrl = `/plate-generate/cars/${letters}/${numbers}/${emirate}`;
          const response = await fetch(proxyUrl);

          if (response.ok) {
            const blob = await response.blob();
            const dataUrl = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });

            // Create a new image from the data URL (same-origin, no taint)
            const img = new Image();
            await new Promise<void>((resolve, reject) => {
              img.onload = () => resolve();
              img.onerror = () =>
                reject(new Error("Failed to load image for canvas"));
              img.src = dataUrl;
            });

            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;

            // Calculate centered position (max 80% width as per CSS)
            const maxWidth = rect.width * 0.8;
            const aspectRatio = imgWidth / imgHeight;
            const drawWidth = Math.min(maxWidth, imgWidth);
            const drawHeight = drawWidth / aspectRatio;

            // Center horizontally
            const drawX = (rect.width - drawWidth) / 2;
            // Position in top area (flex-1 area, roughly centered in top 60%)
            const topAreaHeight = rect.height - 40 - 30;
            const drawY = (topAreaHeight - drawHeight) / 2 + 16;

            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          }
        } catch (imgErr) {
          console.warn("Could not include plate image in download:", imgErr);
          // Continue without the plate image
        }
      }

      // Draw price if present
      if (price) {
        ctx.fillStyle =
          bgColor === "black" || bgColor === "#000" || bgColor === "#000000"
            ? "#ffffff"
            : "#000000";
        ctx.font = "500 18px sans-serif";
        ctx.textAlign = "center";
        const priceY = plateImg ? rect.height - 70 : rect.height / 2;
        ctx.fillText(`${t("priceLabel")} ${price}`, rect.width / 2, priceY);
      }

      // Draw details text
      if (details) {
        ctx.fillStyle =
          bgColor === "black" || bgColor === "#000" || bgColor === "#000000"
            ? "#ffffff"
            : "#000000";
        ctx.font = "500 18px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(details, 16, rect.height - 50);
      }

      // Draw bottom bar
      ctx.fillStyle = barColor;
      ctx.fillRect(0, rect.height - 40, rect.width, 40);

      // Draw contact text on bar
      const barTextColor =
        barColor === "white" || barColor === "#fff" || barColor === "#ffffff"
          ? "#000000"
          : "#ffffff";
      ctx.fillStyle = barTextColor;
      ctx.font = "400 16px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${t("toContact")} ${mobile}`, 16, rect.height - 14);

      // Download
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `plate-${letters || "X"}-${numbers || "0"}-${
        emirate || "uae"
      }.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(t("imageDownloaded"));
    } catch (err) {
      console.error("Download error:", err);
      toast.error(t("imageDownloadFailed"));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="px-4 container ">
      <div
        ref={plateContainerRef}
        className="relative w-96 min-h-72 border mx-auto mb-4 flex flex-col bg-cover bg-center"
        style={{
          backgroundColor: bgColor,
          backgroundImage:
            bgColor === "black"
              ? "url(/images/pattern.jpeg)"
              : "url(/images/pattern1.jpeg)",
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 py-4">
          {plates.map((plate, index) => {
            if (!plate.emirate || !plate.letters || !plate.numbers) return null;
            const imgUrl = `${plateBaseUrl}/plate-generate/cars/${plate.letters}/${plate.numbers}/${plate.emirate}`;

            return (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={imgUrl}
                  alt="plate image"
                  className="max-w-[80%] h-auto object-contain"
                />
                {plate.price && (
                  <p
                    className={`${getContrastTextClass(
                      bgColor
                    )} text-lg font-medium mt-1`}
                  >
                    {plate.price === "0"
                      ? t("price_on_request")
                      : `${t("priceLabel")} ${plate.price}`}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <h2
          className={`${getContrastTextClass(
            bgColor
          )} text-lg font-medium mb-2 px-4`}
        >
          {details}
        </h2>

        <div className="w-full h-10 flex" style={{ backgroundColor: barColor }}>
          <p
            className={`flex items-center px-4 ${getContrastTextClass(
              barColor
            )}`}
          >
            {t("toContact")} {mobile}
          </p>
        </div>
      </div>

      <div
        onClick={addPlate}
        className="w-full h-12 rounded-2xl bg-[#EBAF29] mt-4 px-4 flex items-center justify-between cursor-pointer"
      >
        <p className="text-[#192540] text-base font-medium">
          {t("plates_data")}
        </p>
        <div className="text-[#192540] text-2xl font-medium">+</div>
      </div>

      {plates.map((plate, index) => (
        <div
          key={index}
          className="relative flex flex-wrap items-center gap-4 mt-4 w-full border-b pb-6"
        >
          {plates.length > 1 && (
            <button
              type="button"
              onClick={() => removePlate(index)}
              className="absolute top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          )}

          <Select
            onValueChange={(value) =>
              setPlates((prev) =>
                prev.map((p, i) =>
                  i === index ? { ...p, emirate: value } : p
                )
              )
            }
          >
          <SelectTrigger className="lg:w-72 w-full h-12!">
            <SelectValue placeholder={t("emiratePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dubai">{t("emirates.dubai")}</SelectItem>
            <SelectItem value="abu-dhabi">
              {t("emirates.abu_dhabi")}
            </SelectItem>
            <SelectItem value="sharjah">{t("emirates.sharjah")}</SelectItem>
            <SelectItem value="ajman">{t("emirates.ajman")}</SelectItem>
            <SelectItem value="fujairah">
              {t("emirates.fujairah")}
            </SelectItem>
            <SelectItem value="ras_alkhima">
              {t("emirates.ras_alkhima")}
            </SelectItem>
            <SelectItem value="om_qauquan">
              {t("emirates.om_qauquan")}
            </SelectItem>
          </SelectContent>
        </Select>

        <input
          type="text"
          className="lg:w-72 w-full h-12 border rounded-md px-4"
          placeholder={t("lettersPlaceholder")}
          value={plate.letters}
          onChange={(e) =>
            setPlates((prev) =>
              prev.map((p, i) =>
                i === index ? { ...p, letters: e.target.value } : p
              )
            )
          }
        />

        <input
          type="text"
          className="lg:w-72 w-full h-12 border rounded-md px-4"
          placeholder={t("numberPlaceholder")}
          value={plate.numbers}
          onChange={(e) =>
            setPlates((prev) =>
              prev.map((p, i) =>
                i === index ? { ...p, numbers: e.target.value } : p
              )
            )
          }
        />

        <input
          type="number"
          className="lg:w-72 w-full h-12 border rounded-md px-4"
          placeholder={t("pricePlaceholder")}
          value={plate.price}
          onChange={(e) =>
            setPlates((prev) =>
              prev.map((p, i) =>
                i === index ? { ...p, price: e.target.value } : p
              )
            )
          }
        />
      </div>
    ))}

      <div className="mt-4">
        <label className="text-[#192540] text-base font-medium">
          {t("contactNumberLabel")}
        </label>
        <input
          type="text"
          className="w-full h-12 border rounded-md mt-2 px-4"
          placeholder={t("mobilePlaceholder")}
          value={mobile}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            setMobile(onlyNumbers);
          }}
        />
      </div>

      <div className="mt-4">
        <label className="text-[#192540] text-base font-medium">
          {t("additionalDetailsLabel")}
        </label>
        <input
          type="text"
          className="w-full h-12 border rounded-md mt-2 px-4"
          placeholder={t("commentPlaceholder")}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <p className="text-[#192540] text-base font-medium">
          {t("backgroundColorLabel")}
        </p>
        <div className="mt-2 flex items-center gap-4">
          <div
            className="w-full h-12 border bg-white rounded-md cursor-pointer"
            onClick={() => setBgColor("white")}
          ></div>

          <div
            className="w-full h-12 border bg-black rounded-md cursor-pointer"
            onClick={() => setBgColor("black")}
          ></div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[#192540] text-base font-medium">
          {t("communicationBarLabel")}
        </p>
        <div className="mt-2 flex items-center gap-4">
          <div
            className="w-full h-12 border bg-[#E50000] rounded-md cursor-pointer"
            onClick={() => setBarColor("#E50000")}
          ></div>

          <div
            className="w-full h-12 border bg-white rounded-md cursor-pointer"
            onClick={() => setBarColor("white")}
          ></div>

          <div
            className="w-full h-12 border bg-[#373737] rounded-md cursor-pointer"
            onClick={() => setBarColor("#373737")}
          ></div>
        </div>
      </div>

      <button
        className="w-full h-12 bg-[#EBAF29] rounded-md mt-8 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? t("downloading") : t("downloadImage")}
      </button>
    </section>
  );
};

export default DrawPlatesPattern;
