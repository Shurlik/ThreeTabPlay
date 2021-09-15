import {SET_THEME, SET_LOADED} from './actions';

const defaultState = {
  isDark: 'false',
  isLoaded: 'false',
};

export const themeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {...state, isDark: action.payload};
    case SET_LOADED:
      return {...state, isLoaded: action.payload};
    default:
      return state;
  }
};
