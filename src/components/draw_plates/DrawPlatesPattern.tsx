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
import { X, Loader2 } from "lucide-react";

type PlateData = {
  emirate: string;
  letters: string;
  numbers: string;
  price: string;
};

const PlateImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  return (
    <div className="relative flex items-center justify-center w-full min-h-[50px] plate-image-container">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="w-8 h-8 animate-spin text-[#EBAF29]" />
        </div>
      )}
      {hasError ? (
        <div className="flex flex-col items-center justify-center text-red-500 p-2 border border-red-200 rounded bg-red-50 plate-error-state w-[80%]">
          <span className="text-xs text-center font-medium">
            Image unavailable
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300 plate-image`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

const DrawPlatesPattern = () => {
  const plateContainerRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState("black");
  const [barColor, setBarColor] = useState("white");
  const [details, setDetails] = useState("");
  const [mobile, setMobile] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Direct URL to the plate image (cross-origin, for display only)
  const { t, i18n } = useTranslation("draw");
  const isRtl = i18n.language === "ar";

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

  const handleDownload = async () => {
    if (!plateContainerRef.current) return;

    setIsDownloading(true);

    try {
      // Wait for all plate images to be loaded before proceeding
      const container = plateContainerRef.current;
      const imageElements = Array.from(
        container.querySelectorAll(".plate-image")
      ) as HTMLImageElement[];

      // Wait for all images to load or error out
      await Promise.all(
        imageElements.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                // Image already loaded or cached
                resolve();
              } else {
                const onLoad = () => {
                  img.removeEventListener("load", onLoad);
                  img.removeEventListener("error", onError);
                  resolve();
                };
                const onError = () => {
                  img.removeEventListener("load", onLoad);
                  img.removeEventListener("error", onError);
                  resolve(); // Resolve even on error to continue download
                };
                img.addEventListener("load", onLoad);
                img.addEventListener("error", onError);
              }
            })
        )
      );

      // Get dimensions from the container
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
      try {
        const bgImageSrc =
          bgColor === "black"
            ? "/images/pattern.jpeg"
            : "/images/pattern1.jpeg";
        const bgImg = new Image();
        await new Promise<void>((resolve, reject) => {
          bgImg.onload = () => resolve();
          bgImg.onerror = reject;
          bgImg.src = bgImageSrc;
        });

        // Simulate background-size: cover and background-position: center
        const imgRatio = bgImg.width / bgImg.height;
        const containerRatio = rect.width / rect.height;

        let drawW, drawH, drawX, drawY;

        if (containerRatio > imgRatio) {
          // Container is wider relative to image -> fit width
          drawW = rect.width;
          drawH = rect.width / imgRatio;
          drawX = 0;
          drawY = (rect.height - drawH) / 2; // Center vertically
        } else {
          // Container is taller relative to image -> fit height
          drawH = rect.height;
          drawW = rect.height * imgRatio;
          drawY = 0;
          drawX = (rect.width - drawW) / 2; // Center horizontally
        }

        ctx.drawImage(bgImg, drawX, drawY, drawW, drawH);
      } catch (e) {
        console.warn(
          "Failed to load background pattern, falling back to color",
          e
        );
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      // Find all plate wrappers
      const wrappers = Array.from(
        container.querySelectorAll(".plate-wrapper")
      ) as HTMLDivElement[];

      for (const wrapper of wrappers) {
        // Skip check for error state to allow drawing price even if image fails
        // if (wrapper.querySelector(".plate-error-state")) {
        //   continue;
        // }

        // Find image
        const img = wrapper.querySelector(".plate-image") as HTMLImageElement;
        if (img) {
          const imgRect = img.getBoundingClientRect();
          const x = imgRect.left - rect.left;
          const y = imgRect.top - rect.top;
          const w = imgRect.width;
          const h = imgRect.height;

          try {
            const src = img.src;
            if (!src) continue;

            let imageToDraw: HTMLImageElement | null = null;

            // Helper to load image from URL
            const loadImage = (
              url: string,
              isCors: boolean
            ): Promise<HTMLImageElement> => {
              return new Promise((resolve, reject) => {
                const i = new Image();
                if (isCors) i.crossOrigin = "anonymous";
                i.onload = () => resolve(i);
                i.onerror = reject;
                i.src = url;
              });
            };

            // Helper to fetch blob and create object URL
            const fetchImage = async (url: string): Promise<string> => {
              // Add cache buster to avoid browser caching issues with CORS
              const urlWithCache = url.includes("?")
                ? `${url}&t=${Date.now()}`
                : `${url}?t=${Date.now()}`;

              const res = await fetch(urlWithCache, {
                headers: {
                  Accept: "image/png,image/jpeg,image/*",
                },
              });
              if (!res.ok)
                throw new Error(
                  `Fetch failed: ${res.status} ${res.statusText}`
                );
              const blob = await res.blob();
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
              });
            };

            // Strategy 1: Fetch via Custom Proxy (Handles Redirects & CORS)
            try {
              const urlObj = new URL(src);
              const relativePath = urlObj.pathname + urlObj.search;
              // Use our new robust proxy endpoint
              const proxyUrl = `/api/image-proxy?path=${encodeURIComponent(
                relativePath
              )}`;

              const dataUrl = await fetchImage(proxyUrl);
              imageToDraw = await loadImage(dataUrl, false);
            } catch (e) {
              console.warn("Strategy 1 (Proxy) failed", e);
            }

            // Strategy 2: Direct Image Load with CORS (Fallback)
            if (!imageToDraw) {
              try {
                imageToDraw = await loadImage(src, true);
              } catch (e) {
                console.warn("Strategy 2 (Direct CORS) failed", e);
              }
            }

            // Strategy 3: Removed redundant strategies
            // Strategy 4: Removed redundant strategies

            if (imageToDraw) {
              ctx.drawImage(imageToDraw, x, y, w, h);
            } else {
              console.warn("All strategies failed to load image:", src);
            }
          } catch (e) {
            console.warn("Failed to process plate image", e);
          }
        }

        // Find price
        const priceEl = wrapper.querySelector(
          ".plate-price"
        ) as HTMLParagraphElement;
        if (priceEl) {
          // Calculate position relative to container using offsetLeft/offsetTop
          let offsetLeft = priceEl.offsetLeft;
          let offsetTop = priceEl.offsetTop;

          // Walk up the DOM tree to accumulate offsets until we reach the container
          let current = priceEl.offsetParent as HTMLElement | null;
          while (current && current !== container) {
            offsetLeft += current.offsetLeft;
            offsetTop += current.offsetTop;
            current = current.offsetParent as HTMLElement | null;
          }

          const px = offsetLeft + priceEl.offsetWidth / 2;
          const py = offsetTop + priceEl.offsetHeight / 2;

          ctx.fillStyle =
            bgColor === "black" || bgColor === "#000" || bgColor === "#000000"
              ? "#ffffff"
              : "#000000";
          ctx.font = "500 18px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(priceEl.innerText, px, py);
        }
      }

      const isRTL = i18n.language === "ar";

      // Draw details text
      if (details) {
        ctx.fillStyle =
          bgColor === "black" || bgColor === "#000" || bgColor === "#000000"
            ? "#ffffff"
            : "#000000";
        ctx.font = "500 18px sans-serif";
        ctx.textAlign = isRTL ? "right" : "left";
        ctx.textBaseline = "alphabetic";
        const xPos = isRTL ? rect.width - 16 : 16;
        ctx.fillText(details, xPos, rect.height - 50);
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
      ctx.textAlign = isRTL ? "right" : "left";
      ctx.textBaseline = "alphabetic";
      const contactXPos = isRTL ? rect.width - 16 : 16;
      ctx.fillText(
        `${t("toContact")} ${mobile}`,
        contactXPos,
        rect.height - 14
      );

      // Download
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `plates-collection.png`;
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
              <div
                key={index}
                className="flex flex-col items-center w-full plate-wrapper"
              >
                <PlateImage
                  src={imgUrl}
                  alt="plate image"
                  className="max-w-[80%] h-auto object-contain plate-image"
                />
                {plate.price && (
                  <p
                    className={`${getContrastTextClass(
                      bgColor
                    )} text-lg font-medium mt-1 plate-price`}
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
              className="absolute top-2 ltr:-right-2 rtl:-left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          )}

          <Select
            dir={isRtl ? "rtl" : "ltr"}
            onValueChange={(value) =>
              setPlates((prev) =>
                prev.map((p, i) => (i === index ? { ...p, emirate: value } : p))
              )
            }
          >
            <SelectTrigger className="lg:w-72 w-full h-12!">
              <SelectValue placeholder={t("emiratePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dubai">{t("emirates.dubai")}</SelectItem>
              <SelectItem value="abu_dhuabi">
                {t("emirates.abu_dhabi")}
              </SelectItem>
              <SelectItem value="sharjah">{t("emirates.sharjah")}</SelectItem>
              <SelectItem value="ajman">{t("emirates.ajman")}</SelectItem>
              <SelectItem value="fujairah">{t("emirates.fujairah")}</SelectItem>
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
