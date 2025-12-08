import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const DrawPlatesPattern = () => {
    const [bgColor, setBgColor] = useState("black");
    const [barColor, setBarColor] = useState("white");
    const [details, setDetails] = useState("");
    const [mobile, setMobile] = useState("");

    return (
        <section className="px-4">

            <div
                className="w-96 h-72 border flex flex-col justify-end mx-auto mb-8"
                style={{ backgroundColor: bgColor }}
            >
                <h2 className="text-white text-lg font-medium mb-2 px-4">
                    {details}
                </h2>

                <div
                    className="w-full h-10 flex"
                    style={{ backgroundColor: barColor }}
                >
                    <p className="flex items-center px-4">
                        To contact: {mobile}
                    </p>
                </div>
            </div>

            <h2 className="text-[#192540] md:text-[32px] text-xl font-medium">
                Choose Plate Number Pattern
            </h2>

            <div className="flex flex-wrap items-center gap-4 mt-4 w-full">
                <Select>
                    <SelectTrigger className="lg:w-96 w-full h-12">
                        <SelectValue placeholder="Dubai" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Dubai</SelectItem>
                        <SelectItem value="2">Dubai</SelectItem>
                        <SelectItem value="3">Dubai</SelectItem>
                    </SelectContent>
                </Select>

                <input 
                    type="text"
                    className="lg:w-96 w-full h-12 border rounded-md px-4"
                    placeholder="Number"
                />

                <input 
                    type="text"
                    className="lg:w-96 w-full h-12 border rounded-md px-4"
                    placeholder="Price"
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

        </section>
    );
};

export default DrawPlatesPattern;
