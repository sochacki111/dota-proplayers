import axios from '../config/axios';
import { Request, Response, NextFunction } from 'express';
import { client } from '../config/redis';

class UsersController {
  public static async fetchProPlayers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { data } = await axios.get('/proplayers');
      let i = 0;
      data.forEach(async (player: any) => {
        await client.zadd('proplayers', i, JSON.stringify(player));
        // await client.zadd('proplayers', i, player);
        i++;
      });
      return res.status(200).send(data);``
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}

export default UsersController;
