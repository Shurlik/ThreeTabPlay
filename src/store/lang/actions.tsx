export const SET_CURRENT_LANG = 'SET_LANG';

export const setCurrLang = lang => {
  return {
    type: SET_CURRENT_LANG,
    payload: lang,
  };
};
