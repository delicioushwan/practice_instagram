import * as actions from '../actions';

const initialState = {
  pageUser: {},
  posts: [],
  mypageUserId: undefined,
  followers: [],
  followings: [],
  bundle: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.getMypage().type:
      return {
        ...state,
        posts: action.payload.posts,
        pageUser: action.payload.user,
        followers: action.payload.followers,
        followings: action.payload.followings,
      };
    case actions.mypageUserId().type:
      return {
        ...state,
        mypageUserId: action.payload,
      };
    case actions.getBundle().type:
      return {
        ...state,
        bundle: action.payload,
      };
    case actions.likeGetData().type:
      return {
        ...state,
        posts: action.payload.posts,
        followers: action.payload.followers,
        followings: action.payload.followings,
      };
    case actions.goToMypage().type:
      return {
        ...state,
        mypageUserId: action.payload,
      };
    default:
      return state;
  }
}
