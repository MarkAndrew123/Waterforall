import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function ExcelUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("excel", file);
      
      const response = await apiRequest("POST", "/api/upload-excel", formData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: `Excel file processed successfully. ${data.recordsProcessed} records added.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/water-statistics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard-analytics"] });
      setFile(null);
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to process Excel file",
        variant: "destructive",
      });
    },
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile) {
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please select a valid Excel file (.xlsx or .xls)",
          variant: "destructive",
        });
        return;
      }
      
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileSpreadsheet className="mr-2 h-5 w-5" />
          Upload Excel Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-water-blue bg-blue-50"
              : "border-gray-300 hover:border-water-blue"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-600 mb-4">
            Drag and drop your Excel file here, or click to browse
          </p>
          
          <Input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            className="hidden"
            id="excel-upload"
          />
          
          <Button
            onClick={() => document.getElementById("excel-upload")?.click()}
            className="bg-water-blue text-white hover:bg-blue-600 mb-4"
            disabled={uploadMutation.isPending}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Choose File
          </Button>
          
          <p className="text-sm text-gray-500">
            Supported formats: .xlsx, .xls (Max size: 10MB)
          </p>
        </div>

        {file && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileSpreadsheet className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <Button
                onClick={handleUpload}
                disabled={uploadMutation.isPending}
                className="bg-clean-green text-white hover:bg-green-600"
              >
                {uploadMutation.isPending ? "Processing..." : "Upload"}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="mr-2 h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Excel Format Requirements:</p>
              <ul className="text-sm text-blue-800 mt-1 space-y-1">
                <li>• Column headers: Category, Value, Label, Year, Region (optional)</li>
                <li>• Category examples: clean_water_access, schools_water, decent_toilets</li>
                <li>• Value must be numeric</li>
                <li>• Year must be a 4-digit number</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
