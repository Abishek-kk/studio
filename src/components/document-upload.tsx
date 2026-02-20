"use client";

import { useState, type DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { handleDocumentUpload } from "@/actions/onboarding";
import type { PatientData } from "@/lib/types";
import { UploadCloud, File, Loader2 } from "lucide-react";
// i need to add the thing but i forget that due to one issue
//yes that one
type DocumentUploadProps = {
  onExtractionComplete: (data: PatientData) => void;
};

export function DocumentUpload({ onExtractionComplete }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No File Selected",
        description: "Please select a document to upload.",
      });
      return;
    }
    setIsUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const dataUri = reader.result as string;
      try {
        const extractedData = await handleDocumentUpload(dataUri);
        toast({
          title: "Extraction Successful",
          description: "We've extracted information from your document.",
        });
        onExtractionComplete(extractedData);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Extraction Failed",
          description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
      } finally {
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "File Read Error",
        description: "Could not read the selected file.",
      });
      setIsUploading(false);
    };
  };

  return (
    <Card className="w-full max-w-lg text-center">
      <CardHeader>
        <CardTitle>Secure Document Upload</CardTitle>
        <CardDescription>Upload your referral or medical document to begin.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg transition-colors duration-200 ${
            isDragging ? "border-primary bg-accent/50" : "border-border"
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept="image/*,.pdf"
            disabled={isUploading}
          />
          <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">PDF, PNG, JPG accepted</p>
        </div>
        {file && (
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <File className="h-4 w-4" />
            <span>{file.name}</span>
          </div>
        )}
        <Button onClick={handleUpload} disabled={isUploading || !file} className="w-full">
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Extract Information"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
