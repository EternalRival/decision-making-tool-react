import { createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

const soundStateSchema = z.object({
  soundEnabled: z.boolean(),
});

type soundState = z.infer<typeof soundStateSchema>;

const initialState: soundState = {
  soundEnabled: true,
};

const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    toggleMute(state) {
      state.soundEnabled = !state.soundEnabled;
    },
  },
});

export const { toggleMute } = soundSlice.actions;

export function parseSound(value: unknown) {
  return soundStateSchema.parse(value);
}

export default soundSlice.reducer;
