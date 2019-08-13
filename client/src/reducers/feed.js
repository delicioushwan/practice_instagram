import * as actions from '../actions';


export default function (state = { feed: {}, posts: [] }, action) {
  switch (action.type) {
    case actions.getFeed().type:
      return {
        ...state,
        posts: action.payload.posts,
      };
    default:
      return state;
  }
}
