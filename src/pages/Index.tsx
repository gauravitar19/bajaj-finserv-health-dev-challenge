
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ResponseDisplay from "@/components/ResponseDisplay";
import { MultiSelect } from "@/components/MultiSelect";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateAndParseJSON = (input: string) => {
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed.data)) {
        throw new Error("Input must contain a 'data' array");
      }
      return parsed;
    } catch (error) {
      throw new Error("Invalid JSON format");
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const parsedData = validateAndParseJSON(jsonInput);
      
      const { data, error } = await supabase.functions.invoke('bfhl', {
        method: 'POST',
        body: parsedData
      });

      if (error) throw error;

      setResponse(data);
      toast({
        title: "Success",
        description: "Data processed successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                API Input
              </label>
              <Input
                className="font-mono w-full border border-gray-300"
                placeholder='{ "data": ["M", "1", "334", "4", "B"] }'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </motion.div>

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-4">
              <MultiSelect
                selected={selectedFilters}
                onChange={setSelectedFilters}
              />
              <ResponseDisplay
                response={response}
                selectedFilters={selectedFilters}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
