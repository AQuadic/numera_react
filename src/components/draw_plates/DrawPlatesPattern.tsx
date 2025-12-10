import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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

  const getPlateImageUrl = (letters: string, numbers: string, emirate: string) =>
    `https://numra.motofy.io/plate-generate/cars/${letters}/${numbers}/${emirate}`;

  useEffect(() => {
    if (!emirate || !numbers || !letters) return;

    const imgUrl = getPlateImageUrl(letters, numbers, emirate);
    setPlateImg(imgUrl);
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
              <section className="px-4">
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
                  <p className="text-[#192540] text-lg font-medium text-center my-4">
                    Price: {price}
                  </p>
                )}

                  <h2 className="text-white text-lg font-medium mb-2 px-4">{details}</h2>

                  <div className="w-full h-10 flex" style={{ backgroundColor: barColor }}>
                    <p className="flex items-center px-4">To contact: {mobile}</p>
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
                    type="text"
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
                    onChange={(e) => setMobile(e.target.value)}
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
                <p className="text-[#192540] text-base font-medium">Communication bar color</p>
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
