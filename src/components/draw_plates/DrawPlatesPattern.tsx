import { useState } from "react";
import DeleteIcon from "../icons/plates/DeleteIcon";
import XIcon from "../icons/plates/XIcon";
import { Link } from "react-router";

const DrawPlatesPattern = () => {
  const [pattern, setPattern] = useState<string>("");
    const [selectedChars, setSelectedChars] = useState<string[]>([]); 

    const letters = ["X", "Y", "Z"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

    const addCharacter = (char: string) => {
        setPattern((prev) => prev + char);
        setSelectedChars((prev) =>
        prev.includes(char) ? prev : [...prev, char]
        );
    };

    const clearAll = () => {
        setPattern("");
        setSelectedChars([]);
    };

    const removeLast = () => {
        setPattern((prev) => prev.slice(0, -1));
        setSelectedChars((prev) => prev.slice(0, -1));
    };

    const isSelected = (char: string) => selectedChars.includes(char);

    return (
        <section className="px-4">
        <h2 className="text-[#192540] md:text-[32px] text-xl font-medium">
            Choose Plate Number Pattern
        </h2>
        <p className="text-[#717171] md:text-base text-xs font-medium leading-[150%] mt-2">
            Tap letters and numbers to build a custom sequence. You'll see results <br /> that match your exact pattern (e.g., XY1YX).
        </p>

        <div className="mt-6">
            <h3 className="text-[#192540] text-xl font-medium">Your Pattern</h3>
            <div className="mt-4 relative flex flex-wrap gap-6">
            <input
                type="text"
                value={pattern}
                readOnly
                className="md:w-[692px] w-full h-[72px] border border-[#F0F0F0] rounded-md px-2"
                placeholder="Start building your pattern"
            />
            <div
                className="absolute top-6 right-4 cursor-pointer"
                onClick={removeLast}
            >
                <XIcon />
            </div>

            <div
                className="md:w-[215px] w-full h-[72px] border border-[#F0F0F0] rounded-md flex items-center justify-center gap-2 cursor-pointer"
                onClick={clearAll}
            >
                <DeleteIcon />
                <p className="text-[#D71F1F] text-lg font-semibold">Clear All</p>
            </div>
            </div>
        </div>

        <div className="mt-6">
            <h3 className="text-[#192540] text-xl font-medium">Select Characters</h3>

            <p className="text-[#717171] text-lg font-medium mt-6">Letters</p>
            <div className="mt-3 flex gap-6">
            {letters.map((letter) => (
                <div
                key={letter}
                className={`md:w-[95px] md:h-[94px] w-20 h-20 rounded-md text-[#192540] text-5xl font-medium flex items-center justify-center cursor-pointer ${
                    isSelected(letter) ? "bg-[#EBAF29]" : "bg-[#F0F0F0]"
                }`}
                onClick={() => addCharacter(letter)}
                >
                {letter}
                </div>
            ))}
            </div>
        </div>

        <div className="mt-6">
            <p className="text-[#717171] text-lg font-medium mt-6">Numbers</p>
            <div className="mt-3 grid grid-cols-4 gap-6 md:w-[450px]">
            {numbers.map((num) => (
                <div
                key={num}
                className={`md:w-[95px] md:h-[94px] w-20 h-20 rounded-md text-[#192540] text-5xl font-medium flex items-center justify-center cursor-pointer ${
                    isSelected(num) ? "bg-[#EBAF29]" : "bg-[#F0F0F0]"
                }`}
                onClick={() => addCharacter(num)}
                >
                {num}
                </div>
            ))}
            </div>
        </div>

        <Link to='/plates_result'>
            <button className="md:w-[450px] h-14 bg-[#EBAF29] rounded-md mt-6 text-[#192540] text-lg font-semibold cursor-pointer">
                Search matching plates
            </button>
        </Link>
        </section>
    );
};

export default DrawPlatesPattern;
