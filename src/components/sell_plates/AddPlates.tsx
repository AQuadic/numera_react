import { useState } from "react";
import DeleteIcon from "../icons/plates/DeleteIcon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import AddPlatesHeader from "./AddPlatesHeader";
import Warning from "../icons/plates/Warning";
import { Switch } from "../ui/switch";
import PlusIcon from "../icons/plates/PlusIcon";
import { Link } from "react-router";

const AddPlates = () => {
  const [plates, setPlates] = useState([{}]);
  const options = ["Private", "bike", "classic", "Fun"];
  const [selectedTypes, setSelectedTypes] = useState(["Private"]);

  const addPlate = () => {
    setPlates([...plates, {}]);
    setSelectedTypes([...selectedTypes, "Private"]);
  };

  const removePlate = (index: number) => {
    setPlates(plates.filter((_, i) => i !== index));
    setSelectedTypes(selectedTypes.filter((_, i) => i !== index));
  };

  const selectType = (plateIndex: number, type: string) => {
    const updatedTypes = [...selectedTypes];
    updatedTypes[plateIndex] = type;
    setSelectedTypes(updatedTypes);
  };

    return (
        <div>
        <AddPlatesHeader />
        <div className="mt-8 container space-y-8">
            {plates.map((_, index) => (
            <div key={index} className=" pb-6">
                <div className="flex items-center justify-between">
                <h2 className="text-[#192540] text-[32px] font-medium">Plate #{index + 1}</h2>
                <DeleteIcon className="cursor-pointer" onClick={() => removePlate(index)} />
                </div>

                <div className="mt-6">
                <label className="text-[#192540] text-base font-medium">
                    Origin <span className="text-[#D71F1F]">*</span>
                </label>
                <Select>
                    <SelectTrigger className="w-full mt-4 h-12!">
                    <SelectValue placeholder="Dubai" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="1">Dubai</SelectItem>
                    <SelectItem value="2">Dubai</SelectItem>
                    <SelectItem value="3">Dubai</SelectItem>
                    </SelectContent>
                </Select>
                </div>

                <div className="mt-6">
                <label className="text-[#192540] text-base font-medium">
                    Type <span className="text-[#D71F1F]">*</span>
                </label>
                <div className="mt-4 flex flex-wrap items-center justify-between">
                    {options.map((option) => (
                    <div
                        key={option}
                        className={`w-[255px] h-12 rounded-[10px] text-[#192540] text-base font-medium flex items-center justify-center cursor-pointer ${
                        selectedTypes[index] === option ? "bg-[#EBAF29]" : "bg-[#FDFAF3]"
                        }`}
                        onClick={() => selectType(index, option)}
                    >
                        {option}
                    </div>
                    ))}
                </div>
                </div>

                <div className="flex gap-6 w-full mt-6">
                <div className="w-full">
                    <label className="text-[#192540] text-base font-medium">Code</label>
                    <Select>
                    <SelectTrigger className="w-full mt-4 h-12!">
                        <SelectValue placeholder="Dubai" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-[#192540] text-base font-medium">
                    Number <span className="text-[#D71F1F]">*</span>
                    </label>
                    <input
                    type="text"
                    className="w-full h-12 border border-[#F0F0F0] rounded-[10px] mt-4"
                    />
                </div>
                </div>

                <div className="mt-6 flex flex-col w-full">
                <label className="text-[#192540] text-base font-medium">
                    Price <span className="text-[#D71F1F]">*</span>
                </label>
                <input
                    type="text"
                    className="w-full h-12 border border-[#F0F0F0] rounded-[10px] mt-4 px-2"
                    placeholder="AED 4000"
                />
                <div className="flex items-center gap-2 mt-3">
                    <Warning />
                    <p className="text-[#192540] text-base font-medium">
                    A price of 0 means Price on Request
                    </p>
                </div>
                </div>

                <div className="mt-10 flex items-center justify-between w-1/2">
                    <p className="text-[#192540] text-base font-medium">Negotiable</p>
                    <Switch />
                </div>

                <div
                    className="w-full h-14 border border-[#F0F0F0] rounded-[10px] flex items-center justify-center gap-2 cursor-pointer mt-4"
                    onClick={addPlate}
                    >
                    <PlusIcon />
                    <p className="text-[#717171] text-lg font-semibold">Add another plate</p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-6">
                    <Link to="/confirm_plate" className="w-1/2 h-14 bg-[#EBAF29] rounded-md text-[#192540] text-base font-semibold flex items-center justify-center">
                        Continue to review
                    </Link>
                    <div className="w-1/2 h-14 border border-[#EBAF29] rounded-md text-[#192540] text-base font-semibold flex items-center justify-center">
                        Save Draft
                    </div>
                </div>
            </div>
            ))}

        </div>
        </div>
    );
};

export default AddPlates;
