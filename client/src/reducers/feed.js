import * as actions from '../actions';


export default function (state = { loggedIn: '', posts: [], bundle: undefined }, action) {
  switch (action.type) {
    case actions.getFeed().type:
      return {
        ...state,
        posts: action.payload.posts,
        loggedIn: action.payload.on,
        loggedUser: action.payload.loggedUser,
      };
    case actions.getMypage().type:
      return {
        ...state,
        loggedIn: action.payload.on,
        loggedUser: action.payload.loggedUser,
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
    case actions.clearBundle().type:
      return {
        ...state,
        bundle: [],
      }
    default:
      return state;
  }
}
