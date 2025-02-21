
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
  const renderSection = (title: string, data: any) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        <div className="flex">
          <span className="text-gray-700 font-medium">{title}:</span>
          <span className="ml-2 text-gray-900">
            {Array.isArray(data) ? data.join(',') : data}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="mt-4">
      <div className="text-sm text-gray-600 font-medium mb-2">Filtered Response</div>
      <div className="space-y-2">
        <AnimatePresence>
          {selectedFilters.includes("numbers") && renderSection("Numbers", response.numbers)}
          {selectedFilters.includes("highest_alphabet") && renderSection("Highest Alphabet", response.highest_alphabet)}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResponseDisplay;
