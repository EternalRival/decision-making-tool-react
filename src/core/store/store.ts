import { configureStore } from '@reduxjs/toolkit';
import decisionPickerReducer, {
  persistDecisionPickerState,
} from '~/modules/decision-picker/store/decision-picker-slice';
import optionsReducer, { persistOptionsState } from './options-slice';

const store = configureStore({
  reducer: {
    ...optionsReducer,
    ...decisionPickerReducer,
  },
});

persistOptionsState(() => store.getState().options);
persistDecisionPickerState(() => store.getState().decisionPicker);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
