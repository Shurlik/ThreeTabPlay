import {SET_CURRENT_LANG} from './actions';

const defaultState = {
  currentLang: 'en',
};

export const langReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_LANG:
      return {...state, currentLang: action.payload};
    default:
      return state;
  }
};
