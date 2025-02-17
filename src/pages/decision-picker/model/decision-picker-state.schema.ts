import { z } from 'zod';

export const decisionPickerStateSchema = z.object({
  soundEnabled: z.boolean(),
  durationValue: z.number(),
});

export type DecisionPickerState = z.infer<typeof decisionPickerStateSchema>;
