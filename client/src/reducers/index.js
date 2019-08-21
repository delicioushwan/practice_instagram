import { combineReducers } from 'redux';
import feed from './feed';
import mypage from './mypage';
import currentPage from './currentpage';

const rootReducer = combineReducers({
  feed,
  mypage,
  currentPage,
});

export default rootReducer;
