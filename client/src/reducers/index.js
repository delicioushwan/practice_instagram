import { combineReducers } from 'redux';
import feed from './feed';
import mypage from './mypage';

const rootReducer = combineReducers({
  feed,
  mypage,
});

export default rootReducer;
