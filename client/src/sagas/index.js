import { all, fork } from 'redux-saga/effects';

import feed from './feed';
import mypage from './mypage';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(feed), fork(mypage)]);
}
