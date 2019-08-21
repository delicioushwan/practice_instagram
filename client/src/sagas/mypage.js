import { put, call, takeLatest, all } from 'redux-saga/effects';
import Axios from 'axios';
import * as actions from '../actions';

export function* requestMypage(action) {
  const data = pageUserId => ({
    method: 'GET',
    url: 'http://localhost:4000/mypage',
    withCredentials: true,
    params: { feed: pageUserId },
  });
  try {
    const response = yield call([Axios, 'request'], data(action.payload));
    yield put({
      type: actions.getMypage().type,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* likeOnMypage(action) {
  const data = (post_id, currentPage, feed) => ({
    method: 'POST',
    url: 'http://localhost:4000/mypage/like',
    data: { post_id, currentPage, feed },
    withCredentials: true,
  });
  const { currentPage, post_id, feed } = action.payload;
  try {
    const response = yield call([Axios, 'request'], data(post_id, currentPage, feed));
    if (currentPage === 'MyPage') {
      yield put({
        type: actions.likeGetData().type,
        payload: response.data,
      });
    } else if (currentPage === 'Feed') {
      yield put({
        type: actions.getFeedData().type,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* likeOnComment(action) {
  const data = (comment_id, currentPage, feed) => ({
    method: 'POST',
    url: 'http://localhost:4000/mypage/commentlike',
    data: { comment_id, currentPage, feed },
    withCredentials: true,
  });
  const { currentPage, comment_id, feed } = action.payload;
  try {
    const response = yield call([Axios, 'request'], data(comment_id, currentPage, feed));

    if (currentPage === 'MyPage') {
      yield put({
        type: actions.likeGetData().type,
        payload: response.data,
      });
    } else if (currentPage === 'Feed') {
      yield put({
        type: actions.getFeedData().type,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}


export function* createComment(action) {
  const data = (comment, post_id, currentPage, feed) => ({
    method: 'POST',
    url: 'http://localhost:4000/mypage/createComment',
    data: { comment, post_id, currentPage, feed },
    withCredentials: true,
  });
  const { currentPage, post_id, comment, feed } = action.payload;
  try {
    const response = yield call([Axios, 'request'], data(comment, post_id, currentPage, feed));
    if (currentPage === 'MyPage') {
      yield put({
        type: actions.likeGetData().type,
        payload: response.data,
      });
    } else if (currentPage === 'Feed') {
      yield put({
        type: actions.getFeedData().type,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* createPost(action) {
  const dataForm = data => ({
    method: 'POST',
    url: 'http://localhost:4000/mypage/createPost',
    data,
    withCredentials: true,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
  });
  const { data } = action.payload;
  console.log('****//-/*/-*/-*/*-/-*/-/*-/-/-//*createPost', data);
  try {
    const response = yield call([Axios, 'request'], dataForm(data));
    yield put({
      type: actions.likeGetData().type,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeLatest('REQUEST_MYPAGE', requestMypage),
    takeLatest(actions.likeOnMypage().type, likeOnMypage),
    takeLatest(actions.likeOnComment().type, likeOnComment),
    takeLatest(actions.createComment().type, createComment),
    takeLatest(actions.createPost().type, createPost),
  ]);
}
