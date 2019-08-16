import * as actions from '../actions';


export default function (state = 'Feed', action) {
  switch (action.type) {
    case actions.currentpage().type:
      return action.payload;
    default:
      return state;
  }
}
