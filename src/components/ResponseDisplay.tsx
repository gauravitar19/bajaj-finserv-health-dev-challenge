
import { motion, AnimatePresence } from "framer-motion";

interface Response {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: string[];
  alphabets: string[];
  highest_alphabet: string[];
}

interface ResponseDisplayProps {
  response: Response;
  selectedFilters: string[];
}

const ResponseDisplay = ({ response, selectedFilters }: ResponseDisplayProps) => {
  const renderSection = (title: string, data: any, filter: string) => {
    if (!selectedFilters.includes(filter)) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(data) ? (
            data.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-gray-700">{data}</span>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="mt-6 space-y-6">
      <AnimatePresence>
        {renderSection("Numbers", response.numbers, "numbers")}
        {renderSection("Alphabets", response.alphabets, "alphabets")}
        {renderSection(
          "Highest Alphabet",
          response.highest_alphabet,
          "highest_alphabet"
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResponseDisplay;
