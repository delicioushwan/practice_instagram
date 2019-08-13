import { put, takeLatest, call } from 'redux-saga/effects';
import Axios from 'axios';

import * as actions from '../actions';

const second = {
  method: 'GET',
  url: 'http://cloninginstagram-env.qxdnpfc8ws.us-east-2.elasticbeanstalk.com/feed',
  withCredentials: true,
};

export function* requestFeed() {
  try {
    const response = yield call([Axios, 'request'], second);
    yield put({
      type: actions.getFeed().type,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield takeLatest('REQUEST_FEED', requestFeed);
}
