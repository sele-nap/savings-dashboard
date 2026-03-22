import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(401).json({ message: 'Identifiants incorrects.' });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ message: 'Identifiants incorrects.' });
    return;
  }

  res.cookie('auth_session', '1', {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true });
};

export const logout = (_req: Request, res: Response): void => {
  res.clearCookie('auth_session', { path: '/' });
  res.json({ success: true });
};
