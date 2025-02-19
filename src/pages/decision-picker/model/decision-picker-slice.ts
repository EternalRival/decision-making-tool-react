import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LSService } from '~/shared/lib/local-storage';
import { decisionPickerStateSchema, type DecisionPickerState } from './decision-picker-state.schema';

const STORAGE_KEY = 'decision-picker';

const decisionPickerSlice = createSlice({
  name: 'decisionPicker',
  initialState: () =>
    decisionPickerStateSchema.catch({ soundEnabled: true, durationValue: 16 }).parse(LSService.get(STORAGE_KEY)),
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

export const decisionPickerSliceReducer = { [decisionPickerSlice.reducerPath]: decisionPickerSlice.reducer };
