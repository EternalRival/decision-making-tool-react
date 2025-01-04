import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import LSService from '~/core/services/local-storage.service';
import decisionPickerStateSchema, { type DecisionPickerState } from '../schemas/decision-picker-state.schema';

const STORAGE_KEY = 'decision-picker';

const initialState = (): DecisionPickerState => {
  try {
    return decisionPickerStateSchema.parse(LSService.get(STORAGE_KEY));
  } catch {
    return { soundEnabled: true, durationValue: 16 };
  }
};

const decisionPickerSlice = createSlice({
  name: 'decisionPicker',
  initialState,
  reducers: {
    toggleMute(state) {
      state.soundEnabled = !state.soundEnabled;
    },
    setDuration(state, { payload }: PayloadAction<{ durationValue: number }>) {
      state.durationValue = payload.durationValue;
    },
  },
});

export const { setDuration, toggleMute } = decisionPickerSlice.actions;

export function persistDecisionPickerState(getState: () => DecisionPickerState) {
  window.addEventListener('beforeunload', () => {
    LSService.set(STORAGE_KEY, getState());
  });
}

export default { [decisionPickerSlice.reducerPath]: decisionPickerSlice.reducer };
