import User from '../models/user';
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';

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
    return res.json({ user });
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

export function logout(req, res) {
  return res.status(200).end();
}
