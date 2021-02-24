import { promisify } from 'util';
import { REDIS_CLIENT } from '../util/secrets';
import logger from "./logger";

export const client = REDIS_CLIENT;

logger.debug('redis connected');

export const zadd = promisify(client.zadd).bind(client);
export const zrange = promisify(client.zrange).bind(client);
