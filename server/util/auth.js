import jwt from 'jsonwebtoken';


export function getCleanUser(user) {
  // TODO: edit here which things to send back for session purposes
  return {
    email: user.email,
    id: user._id,
  };
}

export function generateToken(user) {
  const userInfo = getCleanUser(user);
  // TODO: Get a real secret string
  return jwt.sign(userInfo, 'secret', { expiresIn: '7 days' })
}
