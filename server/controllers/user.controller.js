import User from '../models/user';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';


export function registerUser(req, res) {
  // TODO Subtler error handling, with better error messages
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const input = req.body.user;
  const email = sanitizeHtml(input.email);
  const password = sanitizeHtml(input.password);

  const user = new User({ email, password });
  user.cuid = cuid();

  user.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    return res.json({ user: saved });
  });
}
