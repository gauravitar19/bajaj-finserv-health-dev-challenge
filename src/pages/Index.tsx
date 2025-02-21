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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 backdrop-blur-sm bg-white/80 border-0 shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Data Processor
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JSON Input
                </label>
                <Input
                  className="font-mono"
                  placeholder='{ "data": ["A", "1", "B", "2"] }'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </div>
              <Button
                className="w-full transition-all duration-200 hover:shadow-md"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Process Data"}
              </Button>
            </div>
          </Card>
        </motion.div>

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <MultiSelect
                selected={selectedFilters}
                onChange={setSelectedFilters}
              />
              <ResponseDisplay
                response={response}
                selectedFilters={selectedFilters}
              />
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
