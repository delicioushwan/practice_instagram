import * as actions from '../actions';


export default function (state = { loggedIn: '', posts: [], bundle: undefined }, action) {
  switch (action.type) {
    case actions.getFeed().type:
      return {
        ...state,
        posts: action.payload.posts,
        loggedIn: action.payload.on,
      };
    case actions.getMypage().type:
      return {
        ...state,
        loggedIn: action.payload.on,
      };
    case actions.getBundleFeed().type:
      return {
        ...state,
        bundle: action.payload,
      };
    case actions.getFeedData().type:
      return {
        ...state,
        posts: action.payload.posts,
      };
    default:
      return state;
  }
}
