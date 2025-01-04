import { configureStore } from '@reduxjs/toolkit';
import soundReducer from '~/modules/decision-picker/store/sound-slice';
import optionsReducer from './options-slice';

const store = configureStore({
  reducer: {
    options: optionsReducer,
    sound: soundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
