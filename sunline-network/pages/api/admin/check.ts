import { NextApiRequest, NextApiResponse } from 'next';

export default function checkHandler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.headers.cookie || '';
  if (cookie.includes('sunline_admin=1')) res.status(200).json({ ok: true });
  else res.status(401).json({ ok: false });
}
