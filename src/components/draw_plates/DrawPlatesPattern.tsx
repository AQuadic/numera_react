import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { generatePlate } from "../../lib/api/plates/generatePlate";

const DrawPlatesPattern = () => {
  const [bgColor, setBgColor] = useState("black");
  const [barColor, setBarColor] = useState("white");
  const [details, setDetails] = useState("");
  const [mobile, setMobile] = useState("");
  const [price, setPrice] = useState("");

  const [emirate, setEmirate] = useState("");
  const [numbers, setNumbers] = useState("");
  const [letters, setLetters] = useState("");
  const [plateImg, setPlateImg] = useState("");

  const getPlateImageUrl = (
    letters: string,
    numbers: string,
    emirate: string
  ) =>
    `https://numra.motofy.io/plate-generate/cars/${letters}/${numbers}/${emirate}`;

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
    // Don't call API unless all 3 fields are filled (non-empty after trimming)
    if (
      !emirate?.toString().trim() ||
      !numbers?.toString().trim() ||
      !letters?.toString().trim()
    ) {
      setPlateImg("");
      return;
    }

    // Validate plate using API before setting the image. If API fails, show error toast.
    const validate = async () => {
      try {
        const data = await generatePlate(letters, numbers, emirate);
        // If API responds with data, set image URL and price (if provided)
        const imgUrl = getPlateImageUrl(letters, numbers, emirate);
        setPlateImg(imgUrl);
        if (!price && data?.price) setPrice(String(data.price));
      } catch (err) {
        // If API returned an error, inform the user
        toast.error("Plate data is invalid");
        setPlateImg("");
      }
    };

    validate();
  }, [emirate, letters, numbers]);

  const handleDownload = () => {
    if (!plateImg) return;

    const link = document.createElement("a");
    link.href = plateImg;
    link.download = `plate-${letters}-${numbers}-${emirate}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="px-4 container">
      <div
        className="w-96 h-72 border flex flex-col justify-end mx-auto mb-2"
        style={{ backgroundColor: bgColor }}
      >
        {plateImg && (
          <img
            src={plateImg}
            alt="plate image"
            className="w-full h-auto object-contain"
          />
        )}

        {price && (
          <p
            className={`${getContrastTextClass(
              bgColor
            )} text-lg font-medium text-center my-4`}
          >
            Price: {price}
          </p>
        )}

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
            To contact: {mobile}
          </p>
        </div>
      </div>

      <h2 className="text-[#192540] md:text-[32px] text-xl font-medium">
        Choose Plate Number Pattern
      </h2>

      <div className="flex flex-wrap items-center gap-4 mt-4 w-full">
        <Select onValueChange={setEmirate}>
          <SelectTrigger className="lg:w-72 w-full h-12!">
            <SelectValue placeholder="Emirate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dubai">Dubai</SelectItem>
            <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
            <SelectItem value="sharjah">Sharjah</SelectItem>
            <SelectItem value="ajman">Ajman</SelectItem>
            <SelectItem value="fujairah">Fujairah</SelectItem>
            <SelectItem value="ras_alkhima">Ras Al Khaimah</SelectItem>
            <SelectItem value="om_qauquan">Umm Al Quwain</SelectItem>
          </SelectContent>
        </Select>

        <input
          type="text"
          className="lg:w-72 w-full h-12 border rounded-md px-4"
          placeholder="Letters"
          value={letters}
          onChange={(e) => setLetters(e.target.value)}
        />

        <input
          type="text"
          className="lg:w-72 w-full h-12 border rounded-md px-4"
          placeholder="Number"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
        />

        <input
          type="number"
          className="lg:w-72 w-full h-12 border rounded-md px-4"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-[#192540] text-base font-medium">
          Contact number
        </label>
        <input
          type="text"
          className="w-full h-12 border rounded-md mt-2 px-4"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            setMobile(onlyNumbers);
          }}
        />
      </div>

      <div className="mt-4">
        <label className="text-[#192540] text-base font-medium">
          Additional details
        </label>
        <input
          type="text"
          className="w-full h-12 border rounded-md mt-2 px-4"
          placeholder="Comment"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <p className="text-[#192540] text-base font-medium">Background color</p>
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
          Communication bar color
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
        className="w-full h-12 bg-[#EBAF29] rounded-md mt-8 font-medium cursor-pointer"
        onClick={handleDownload}
      >
        Download image
      </button>
    </section>
  );
};

export default DrawPlatesPattern;
