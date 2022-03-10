export const SET_SONG = 'SET_SONG';

const initialState = {
  playingSong: {},
};

export const playerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SONG:
      return {
        ...state,
        playingSong: action.payload,
      };
    default:
      return state;
  }
};
