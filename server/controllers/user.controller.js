import User from '../models/user';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';


export function registerUser(req, res) {
  // TODO Subtler error handling, with better error messages
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
  }

  const input = req.body.user;
  const email = sanitizeHtml(input.email);
  const password = sanitizeHtml(input.password);

  const user = new User({ email, password });
  user.cuid = cuid();

  // TODO: all necessary token stuff for signing in
  user.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    return res.json({ user: saved });
  });
}
