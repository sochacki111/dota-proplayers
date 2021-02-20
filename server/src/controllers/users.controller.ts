import axios from '../config/axios';
import { Request, Response, NextFunction } from 'express';
import { client, zrange } from '../config/redis';
import ProPlayersService from '../services/proplayers.service';

class UsersController {
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
