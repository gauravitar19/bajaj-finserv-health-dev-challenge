
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highest_alphabet", label: "Highest Alphabet" },
];

export const MultiSelect = ({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (value: string[]) => void;
}) => {
  const handleValueChange = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Filter Response
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleValueChange(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selected.includes(option.value)
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
