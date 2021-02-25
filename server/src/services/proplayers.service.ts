import axios from '../config/axios';
import { client, zrange } from '../config/redis';
import ProPlayer from '../interfaces/proplayer.interface';
export default class ProPlayersService {
  public async fetchAll(page = 1) {
    try {
      // TODO Simple "for" for sequential processing or "Reduce"
      // TODO Proplayers instead of index in cache
      if (await client.exists('proplayers')) {
        const { data } = await axios.get('/proplayers');
        let i = 0;
        data.forEach(async (player: ProPlayer) => {
          await client.zadd('proplayers', i, JSON.stringify(player));
          i++;
        });
      }
      const PAGE_SIZE = 50;
      const skip = (page - 1) * PAGE_SIZE;

      const result: string[] = (await zrange(
        'proplayers',
        skip,
        skip + PAGE_SIZE - 1
      )) as string[];
      const newResult: ProPlayer[] = result.map((element) => {
        return JSON.parse(element);
      });

      return newResult;
    } catch (err) {
      return err;
      // Add logger
    }
  }
}
