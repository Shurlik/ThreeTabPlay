import {combineReducers} from 'redux';
import {themeReducer} from './theme/reducers';
import {langReducer} from './lang/reducers';

export default combineReducers({
  theme: themeReducer,
  lang: langReducer,
});
