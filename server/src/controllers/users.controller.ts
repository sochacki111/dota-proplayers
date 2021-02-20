import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { JWT_SECRET, TOKEN_TIMEOUT } from '../util/secrets';
import ProPlayersService from '../services/proplayers.service';
import logger from '../config/logger';

class UsersController {
  private static createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: TOKEN_TIMEOUT
    });
  }

  public static async register(req: Request, res: Response): Promise<Response> {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ error: { message: 'Please send your email and password' } });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: { message: 'The User already exists' } });
    }

    const newUser = new User(req.body);
    await newUser.save();
    logger.debug(`User ${newUser.email} created`);
    return res.status(201).json({
      _id: newUser._id,
      email: newUser.email
    });
  }

  public static async login(req: Request, res: Response): Promise<Response> {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ error: { message: 'Please send your email and password' } });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ error: { message: 'The User does not exists' } });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      return res.status(200).json({
        _id: user._id,
        email: user.email,
        idToken: UsersController.createToken(user),
        expiresIn: TOKEN_TIMEOUT
      });
    }

    return res.status(400).json({
      error: {
        message: 'The email or password are incorrect'
      }
    });
  }
  
  public static async fetchProPlayers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string);

      const proPlayersService = new ProPlayersService();
      const proPlayers = await proPlayersService.fetchAll(page);

      return res.status(200).send(proPlayers);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}

export default UsersController;
