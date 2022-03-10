import {SET_SONG} from '../reducers/playerReducer';

export const changeContracts = (song: any) => (dispatch: any) => {
  dispatch({
    type: SET_SONG,
    payload: song,
  });
};
