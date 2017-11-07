import callApi from '../../util/apiCaller';

// Export Constants
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

// Export Actions
export function receiveCurrentUser(currentUser) {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
}

export function receiveErrors(errors) {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
}

export function login(user) {
  return (dispatch) => {
    return callApi('session', 'post', {
      user: {
        email: user.email,
        password: user.password,
      },
    }).then(function (res) {
      // localStorage.setItem('id_token', res.token);
      console.log(res);
      dispatch(receiveCurrentUser(res.user));
    }, res => dispatch(receiveErrors(res.err.responseJSON))); /* May not be the right way to parse the error.  eg it may not have that method, and it may be err, not res.err */
  };
}

export function logout() {
  return (dispatch) => {
    return callApi('session', 'delete')
      .then(function () {
        console.log('removing');
        // localStorage.removeItem('id_token');
        dispatch(receiveCurrentUser(null));
      }, res => dispatch(receiveErrors(res.err.responseJSON)));
  };
}


export function signup(user) {
  // TODO: token stuff.  does this login the user?
  return (dispatch) => {
    return callApi('users', 'post', {
      user: {
        email: user.email,
        password: user.password,
      },
    }).then(res => dispatch(receiveCurrentUser(res.user)),
        res => dispatch(receiveErrors(res.err.responseJSON))); /* May not be the right way to parse the error.  eg it may not have that method, and it may be err, not res.err */
  };
}

export function userFromToken(token) {
  return (dispatch) => {
    // let token = localStorage.getItem('id_token');
    let token = '';
    if (!token || token === '') {
      return;
    }

    return callApi('currentuser', 'post', { token })
      .then(function (res) {
        // localStorage.setItem('id_token', res.token);
        dispatch(receiveCurrentUser(res.user));
      }, res => dispatch(receiveErrors(res.err.responseJSON))); /* May not be the right way to parse the error.  eg it may not have that method, and it may be err, not res.err */
  };
}
