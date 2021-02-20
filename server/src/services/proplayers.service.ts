import axios from '../config/axios';
import { client, zrange } from '../config/redis';

export default class ProPlayersService {
  // TODO Refine
  public async fetchAll(page = 1) {
    try {
      if (!client.exists('proplayers')) {
        const { data } = await axios.get('/proplayers');
        let i = 0;
        data.forEach(async (player: any) => {
          await client.zadd('proplayers', i, JSON.stringify(player));
          // await client.zadd('proplayers', i, player);
          i++;
        });
      }
      const PAGE_SIZE = 2;
      const skip = (page - 1) * PAGE_SIZE;

      const result: string[] = (await zrange(
        'proplayers',
        skip,
        skip + PAGE_SIZE - 1
      )) as string[];
      const newResult = result.map((element) => {
        return JSON.parse(element);
      });

      return newResult;
    } catch (err) {
      return err;
    }
  }
}
