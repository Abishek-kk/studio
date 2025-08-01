'use server';

/**
 * @fileOverview Extracts patient data from documents using OCR and NLP.
 *
 * - extractPatientData - Extracts relevant medical information from uploaded documents.
 * - ExtractPatientDataInput - The input type for the extractPatientData function.
 * - ExtractPatientDataOutput - The return type for the extractPatientData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractPatientDataInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A medical document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractPatientDataInput = z.infer<typeof ExtractPatientDataInputSchema>;

const ExtractPatientDataOutputSchema = z.object({
  patientName: z.string().describe("The patient's full name.").optional(),
  dateOfBirth: z.string().describe("The patient's date of birth (if available).").optional(),
  medicalConditions: z.array(z.string()).describe("A list of the patient's known medical conditions.").optional(),
  allergies: z.array(z.string()).describe("A list of the patient's known allergies.").optional(),
  medications: z.array(z.string()).describe("A list of the patient's current medications.").optional(),
});
export type ExtractPatientDataOutput = z.infer<typeof ExtractPatientDataOutputSchema>;

export async function extractPatientData(input: ExtractPatientDataInput): Promise<ExtractPatientDataOutput> {
  return extractPatientDataFlow(input);
}

const extractPatientDataPrompt = ai.definePrompt({
  name: 'extractPatientDataPrompt',
  input: {schema: ExtractPatientDataInputSchema},
  output: {schema: ExtractPatientDataOutputSchema},
  prompt: `You are an AI assistant specialized in extracting medical information from patient documents.
  Your goal is to accurately and efficiently identify key data points from the provided document.
  
  Analyze the following document and extract the following information if present:
  - Patient's Full Name
  - Date of Birth
  - Medical Conditions
  - Allergies
  - Medications
  
  Document: {{media url=documentDataUri}}
  
  Return the extracted information in JSON format.
  If a field cannot be reliably extracted, leave it blank, and do not guess.

  Ensure that medical conditions, allergies and medications are returned as arrays of strings.
  `,
});

const extractPatientDataFlow = ai.defineFlow(
  {
    name: 'extractPatientDataFlow',
    inputSchema: ExtractPatientDataInputSchema,
    outputSchema: ExtractPatientDataOutputSchema,
  },
  async input => {
    const {output} = await extractPatientDataPrompt(input);
    return output!;
  }
);
