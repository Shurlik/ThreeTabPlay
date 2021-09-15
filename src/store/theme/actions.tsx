export const SET_THEME = 'SET_THEME';
export const SET_LOADED = 'SET_LOADED';

export const setTheme = theme => {
  return {
    type: SET_THEME,
    payload: theme,
  };
};

export const setLoaded = loaded => {
  return {
    type: SET_LOADED,
    payload: loaded,
  };
};
