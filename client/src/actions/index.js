import { createAction } from 'redux-actions';
import * as types from './ActionTypes';
// feed
export const requestFeed = createAction(types.REQUEST_FEED);
export const getFeed = createAction(types.GET_FEED);

// mypage
export const requestMypage = createAction(types.REQUEST_MYPAGE);
export const getMypage = createAction(types.GET_MYPAGE);
export const mypageUserId = createAction(types.MYPAGE_USER_ID);
