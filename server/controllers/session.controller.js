import User from '../models/user';
import sanitizeHtml from 'sanitize-html';
import { getCleanUser, generateToken } from '../util/auth.js';
import jwt from 'jsonwebtoken';
// store secret_key elsewhere
// import crypto from 'crypto';


export function login(req, res) {
  // TODO Subtler error handling, with better error messages
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
  }

  const input = req.body.user;
  const email = sanitizeHtml(input.email);
  const password = sanitizeHtml(input.password);

  const returnUser = function (err, user) {
    if (err) {
      // throw err;
      return res.status(500).end()
    }

    const token = generateToken(user);
    res.cookie('id_token', token, { maxAge: 900000, httpOnly: true });
    const cleanUser = getCleanUser(user);
    return res.json({ user: cleanUser });
  }

  // is there such a user?
  User.findOne({ email }).exec(function (err, obj) {
    if (err) {
      console.log("IS ERROR");
      res.status(500).end()
    }
    else {
      obj.checkPassword(password, returnUser);
    }
  });
}

export function verifyToken(req, res) {
  // check header or url parameters or post parameters for token
  let token = req.cookies.id_token;
  if (!token) {
    // TODO: standardize error message return values.  fix reducers/actions
    return res.status(401).json({ message: 'Must pass token' });
  }

  // TODO: refactor out a bunch of this code. put it in util/auth.js
  // TODO: get a real secret string
  jwt.verify(token, 'secret', function (err, user) {
    if (err) throw err;

    User.findById({ '_id': user.id }, function (err, user) {
      if (err) throw err;

      const cleanUser = getCleanUser(user);

      // refresh token
      token = generateToken(user);
      res.cookie('id_token', token, { maxAge: 900000, httpOnly: true });
      return res.json({ user: cleanUser });
    });
  });
}

export function logout(req, res) {
  // TODO: check if there is a currentuser.  logout if so.  do token stuff.
  // TODO: return error if there is no currentUser
  res.clearCookie('id_token', { maxAge: 900000, httpOnly: true });
  return res.status(200).end();
}
