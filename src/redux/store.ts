import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './slices/game';

export const store = configureStore({
  reducer: {
    game: gameSlice,
  },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;