import { config } from 'dotenv';
config();

import '@/ai/flows/extract-patient-data.ts';
import '@/ai/flows/form-filler-agent.ts';