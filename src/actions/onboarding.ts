"use server";

import {
  extractPatientData,
  type ExtractPatientDataOutput,
} from "@/ai/flows/extract-patient-data";

export async function handleDocumentUpload(
  documentDataUri: string
): Promise<ExtractPatientDataOutput> {
  if (!documentDataUri) {
    throw new Error("Document data URI is missing.");
  }

  try {
    const result = await extractPatientData({ documentDataUri });
    return result;
  } catch (e) {
    console.error("AI data extraction failed:", e);
    throw new Error("Failed to process document. Please try again.");
  }
}
