import axios from '../util/axios-opendota';
import { client, zrange } from '../config/redis';
import ProPlayer from '../interfaces/proplayer.interface';

export default class ProPlayersService {
  // eslint-disable-next-line class-methods-use-this
  public async fetchAll(page = 1): Promise<ProPlayer[]> {
    const playersCached: boolean = await client.exists('proplayers');
    if (playersCached) {
      const { data } = await axios.get('/proplayers');
      await Promise.all(
        data.map((player: ProPlayer, index: number) =>
          client.zadd('proplayers', index, JSON.stringify(player))
        )
      );
    }
    const PAGE_SIZE = 50;
    const skip = (page - 1) * PAGE_SIZE;

    const result: string[] = (await zrange(
      'proplayers',
      skip,
      skip + PAGE_SIZE - 1
    )) as string[];
    const newResult: ProPlayer[] = result.map((element) => JSON.parse(element));

    return newResult;
  }
}
