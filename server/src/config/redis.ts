import redis from 'redis';
import { promisify } from 'util';
import { REDIS_URL } from '../util/secrets';
import logger from '../config/logger';

export const client = process.env.NODE_ENV === 'test' ? require('fakeredis').createClient() : redis.createClient({ url: REDIS_URL });
logger.debug('redis connected');

export const zadd = promisify(client.zadd).bind(client);
export const zrange = promisify(client.zrange).bind(client);