import { createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';
import LSService from '~/core/services/local-storage.service';

const STORAGE_KEY = 'sound';

const soundStateSchema = z.object({
  soundEnabled: z.boolean(),
});

type SoundState = z.infer<typeof soundStateSchema>;

const initialState = (): SoundState => {
  try {
    return soundStateSchema.parse(LSService.get(STORAGE_KEY));
  } catch {
    return { soundEnabled: true };
  }
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

export function parseSoundState(value: unknown) {
  return soundStateSchema.parse(value);
}

export function persistSoundState(getState: () => SoundState) {
  window.addEventListener('beforeunload', () => {
    LSService.set(STORAGE_KEY, getState());
  });
}

export default { [soundSlice.reducerPath]: soundSlice.reducer };
