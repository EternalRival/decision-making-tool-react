import { configureStore } from '@reduxjs/toolkit';
import soundReducer, { persistSoundState } from '~/modules/decision-picker/store/sound-slice';
import optionsReducer, { persistOptionsState } from './options-slice';

const store = configureStore({
  reducer: {
    ...optionsReducer,
    ...soundReducer,
  },
});

persistOptionsState(() => store.getState().options);
persistSoundState(() => store.getState().sound);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
