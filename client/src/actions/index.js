import { createAction } from 'redux-actions';
import * as types from './ActionTypes';
// feed
export const requestFeed = createAction(types.REQUEST_FEED);
export const getFeed = createAction(types.GET_FEED);
export const getBundleFeed = createAction(types.GET_BUNDLE_FEED);
export const getFeedData = createAction(types.GET_FEED_DATA);
export const goToMypage = createAction(types.GO_TO_MYPAGE);

// mypage
export const requestMypage = createAction(types.REQUEST_MYPAGE);
export const getMypage = createAction(types.GET_MYPAGE);
export const mypageUserId = createAction(types.MYPAGE_USER_ID);
export const likeOnMypage = createAction(types.LIKE_ON_MYPAGE);
export const likeGetData = createAction(types.LIKE_GET_DATA);
export const likeOnComment = createAction(types.LIKE_ON_COMMENT);
export const createComment = createAction(types.CREATE_COMMENT);
export const createPost = createAction(types.CREATE_POST);

// modalPost
export const getBundle = createAction(types.GET_BUNDLE);
