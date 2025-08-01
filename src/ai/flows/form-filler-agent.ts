'use server';

/**
 * @fileOverview This file defines a Genkit flow for pre-filling digital forms with extracted data.
 *
 * - formFillerAgent - A function that takes extracted data and a form schema, and returns the pre-filled form data.
 * - FormFillerAgentInput - The input type for the formFillerAgent function.
 * - FormFillerAgentOutput - The return type for the formFillerAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define schemas for the input and output data
const FormFillerAgentInputSchema = z.object({
  extractedData: z.record(z.string()).describe('Extracted data from the document.'),
  formSchema: z.record(z.string()).describe('The schema of the form to be filled.'),
});

export type FormFillerAgentInput = z.infer<typeof FormFillerAgentInputSchema>;

const FormFillerAgentOutputSchema = z.record(z.string()).describe('The pre-filled form data.');

export type FormFillerAgentOutput = z.infer<typeof FormFillerAgentOutputSchema>;

// Define the main function that calls the flow
export async function formFillerAgent(input: FormFillerAgentInput): Promise<FormFillerAgentOutput> {
  return formFillerAgentFlow(input);
}

// Define the prompt
const formFillerAgentPrompt = ai.definePrompt({
  name: 'formFillerAgentPrompt',
  input: {schema: FormFillerAgentInputSchema},
  output: {schema: FormFillerAgentOutputSchema},
  prompt: `You are an expert form filler. You will be given extracted data and a form schema. Your task is to pre-fill the form with the extracted data.

Extracted Data:
{{extractedData}}

Form Schema:
{{formSchema}}

Pre-filled Form Data:
`,
});

// Define the flow
const formFillerAgentFlow = ai.defineFlow(
  {
    name: 'formFillerAgentFlow',
    inputSchema: FormFillerAgentInputSchema,
    outputSchema: FormFillerAgentOutputSchema,
  },
  async input => {
    const {output} = await formFillerAgentPrompt(input);
    return output!;
  }
);
