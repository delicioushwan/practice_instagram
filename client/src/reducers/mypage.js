import * as actions from '../actions';


export default function (state = { pageUser: {}, posts: [], mypageUserId: '' }, action) {
  console.log(state);
  switch (action.type) {
    case actions.getMypage().type:
      return {
        ...state,
        posts: action.payload.posts,
      };
    case actions.mypageUserId().type:
      return {
        ...state,
        mypageUserId: action.payload,
      };
    default:
      return state;
  }
}
