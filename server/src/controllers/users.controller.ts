import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { JWT_SECRET, TOKEN_TIMEOUT } from '../util/secrets';
import ProPlayersService from '../services/proplayers.service';
import logger from '../config/logger';
import Error from '../interfaces/error.interface';

class UsersController {
  private static createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: TOKEN_TIMEOUT
    });
  }

  public static async register(req: Request, res: Response): Promise<Response> {
    const newUser = new User(req.body);
    await newUser.save();
    logger.debug(`User ${newUser.email} created`);
    return res.status(201).json({
      _id: newUser._id,
      email: newUser.email
    });
  }

  public static async login(req: Request, res: Response): Promise<Response> {
    // Validation if user exists made in middleware
    const user = (await User.findOne({ email: req.body.email })) as IUser;

    // TODO Move to validateRules
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      return res.status(200).json({
        _id: user._id,
        email: user.email,
        idToken: UsersController.createToken(user),
        expiresIn: TOKEN_TIMEOUT
      });
    }

    const extractedErrors: Error[] = [];
    extractedErrors.push({
      password: 'password is incorrect'
    });
    return res.status(422).json({ errors: extractedErrors });
  }

  public static async fetchProPlayers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string, 10);

      const proPlayersService = new ProPlayersService();
      const proPlayers = await proPlayersService.fetchAll(page);

      return res.status(200).send(proPlayers);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}

export default UsersController;
