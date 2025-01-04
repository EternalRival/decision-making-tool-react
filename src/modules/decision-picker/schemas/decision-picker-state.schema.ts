import { z } from 'zod';

const decisionPickerStateSchema = z.object({
  soundEnabled: z.boolean(),
  durationValue: z.number(),
});

export type DecisionPickerState = z.infer<typeof decisionPickerStateSchema>;

export default decisionPickerStateSchema;
