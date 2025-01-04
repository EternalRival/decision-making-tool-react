import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
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

type OptionField = keyof OptionData;

type OptionsState = z.infer<typeof optionsStateSchema>;

const initialState: OptionsState = {
  lastId: 1,
  list: [{ id: `#1`, title: '', weight: '' }],
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    addOption(state, { payload }: PayloadAction<Omit<OptionData, 'id'>>) {
      state.lastId += 1;
      state.list.push({
        id: `#${state.lastId.toString()}`,
        title: payload.title,
        weight: payload.weight,
      });
    },

    updateOption(state, { payload }: PayloadAction<{ id: string; field: OptionField; value: string }>) {
      const { id, field, value } = payload;

      const option = state.list.find((option) => option.id === id);

      if (option) {
        option[field] = value;
      }
    },

    deleteOption(state, { payload }: PayloadAction<{ id: string }>) {
      state.list = state.list.filter((option) => option.id !== payload.id);

      if (state.list.length < 1) {
        state.lastId = 0;
      }
    },

    clearOptions(state) {
      state.list = [];
      state.lastId = 0;
    },

    replaceOptions(state, { payload }: PayloadAction<OptionsState>) {
      state.lastId = payload.lastId;
      state.list = payload.list;
    },
  },
});

export const { addOption, updateOption, deleteOption, clearOptions, replaceOptions } = optionsSlice.actions;

export function parseOptions(value: unknown) {
  return optionsStateSchema.parse(value);
}

export default optionsSlice.reducer;
