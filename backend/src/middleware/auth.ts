import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.cookies?.auth_session;

  if (!userId) {
    res.status(401).json({ message: 'Non authentifié.' });
    return;
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(401).json({ message: 'Session invalide.' });
    return;
  }

  req.user = user;
  next();
};
