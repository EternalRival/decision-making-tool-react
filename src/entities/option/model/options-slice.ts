import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LSService } from '~/shared/lib/local-storage';
import { optionsStateSchema, type OptionData, type OptionsState } from './options-state.schema';

const STORAGE_KEY = 'options';

function initialState(): OptionsState {
  try {
    return optionsStateSchema.parse(LSService.get(STORAGE_KEY));
  } catch {
    return { lastId: 1, list: [{ id: `#1`, title: '', weight: '' }] };
  }
}

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

    updateOption(state, { payload }: PayloadAction<{ id: string; field: keyof OptionData; value: string }>) {
      const { id, field, value } = payload;

      const option = state.list.find((option) => option.id === id);

      if (option) {
        option[field] = value;
      }
    },

    deleteOption(state, { payload }: PayloadAction<{ id: string }>) {
      state.list = state.list.filter((option) => option.id !== payload.id);

      if (state.list.length === 0) {
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

export function persistOptionsState(getState: () => OptionsState) {
  window.addEventListener('beforeunload', () => {
    LSService.set(STORAGE_KEY, getState());
  });
}

export const optionsSliceReducer = { [optionsSlice.reducerPath]: optionsSlice.reducer };
