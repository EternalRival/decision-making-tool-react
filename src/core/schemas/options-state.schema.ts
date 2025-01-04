import { z } from 'zod';

const optionDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  weight: z.string(),
});

const optionsStateSchema = z.object({
  lastId: z.number(),
  list: z.array(optionDataSchema),
});

export type OptionData = z.infer<typeof optionDataSchema>;

export type OptionsState = z.infer<typeof optionsStateSchema>;

export default optionsStateSchema;
