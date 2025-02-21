
import * as React from "react";
import { X } from "lucide-react";

const options = [
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

  const removeFilter = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-600">
        Multi Filter
      </label>
      <div className="relative">
        <div className="min-h-[38px] flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md bg-white">
          {selected.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm text-gray-700"
            >
              {options.find(opt => opt.value === value)?.label}
              <button
                onClick={() => removeFilter(value)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <button className="text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-1">
        <div className="bg-white border border-gray-300 rounded-md shadow-sm">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleValueChange(option.value)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                selected.includes(option.value)
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
