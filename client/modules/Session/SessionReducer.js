// Import Actions
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from './SessionActions';

// Initial State
const initialState = {};

const SessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER :
      return { currentUser: action.currentUser };
    case RECEIVE_ERRORS :
      return { errors: action.errors };
    default:
      return state;
  }
};

export default SessionReducer;
