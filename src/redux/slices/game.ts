import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type GameParams = {
  values: Array<valueParams>,
  itemsCounts: {cross: itemValues, circle: itemValues},
  turn: 'circle' | 'cross',
  chosenValues: {cross: 1 | 2 | 3, circle: 1 | 2 | 3},
  game: boolean,
  wins: {
    cross: number,
    circle: number,
  }
}

export type valueParams = ['' | 'circle' | 'cross', 0 | 1 | 2 | 3];
export type itemValues = [0 | 1 | 2 | 3, 1 | 2 | 3, 0 | 1 | 2 | 3];

// [ 0(cross - 1, circle - 2), 0(size 1-3)]
const values:Array<valueParams> = [
  ['', 0], ['', 0], ['', 0],
  ['', 0], ['', 0], ['', 0],
  ['', 0], ['', 0], ['', 0],
]

const itemsCounts: {cross: itemValues, circle: itemValues} = {
  cross: [3, 2, 1],
  circle: [3, 2, 1],
}

const initialState: GameParams = {
  game: true,
  values,
  itemsCounts,
  chosenValues: {
    cross: 1,
    circle: 1
  },
  turn: 'cross',
  wins: {
    cross: 0,
    circle: 0
  }
} 

const gameSlice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    setValues: (state: GameParams, action: PayloadAction<Array<valueParams>>) => {
      state.values = action.payload;
    },
    endTurn: (state: GameParams) => {
      if(state.turn === 'circle') {
        state.turn = 'cross';
      } else {
        state.turn = 'circle';
      }
    },
    chooseValue: (state: GameParams, action: PayloadAction<{ cross: 1 | 2 | 3, circle: 1 | 2 | 3}>) => {
      state.chosenValues = action.payload;
    },
    makeTurn: (state: GameParams, action: PayloadAction<{index: number, value: ['cross' | 'circle', 1 | 2 | 3]}>) => {
      state.values[action.payload.index] = action.payload.value;
    },
    reduceItemsCounts: (state: GameParams, action: PayloadAction<{type: 'circle' | 'cross', value: number}>) => {
      state.itemsCounts[action.payload.type][action.payload.value]--;
    },
    setItemsCounts: (state: GameParams, action: PayloadAction<{cross: itemValues, circle: itemValues}>) => {
      state.itemsCounts = action.payload;
    },
    endGame: (state: GameParams) => {
      state.game = false;
    },
    resetGame: (state: GameParams) => {
      state.game = true;
      state.itemsCounts = {
        cross: [3, 2, 1],
        circle: [3, 2, 1],
      },
      state.values = [
        ['', 0], ['', 0], ['', 0],
        ['', 0], ['', 0], ['', 0],
        ['', 0], ['', 0], ['', 0],
      ];
      state.chosenValues = {cross: 1, circle: 1};
      state.turn = 'cross';
    }
  }
})

export const { setValues, endTurn, setItemsCounts, chooseValue, endGame, resetGame, reduceItemsCounts, makeTurn } = gameSlice.actions;
export default gameSlice.reducer;