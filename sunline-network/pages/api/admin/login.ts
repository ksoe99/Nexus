import { NextApiRequest, NextApiResponse } from 'next';

export default function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const { user, pass } = JSON.parse(req.body);
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (user === validUser && pass === validPass) {
    res.setHeader('Set-Cookie', `sunline_admin=1; Path=/; HttpOnly; SameSite=Strict`);
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}
