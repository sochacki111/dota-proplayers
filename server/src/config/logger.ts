import pino from 'pino';
import { LOGGER_LEVEL } from '../util/environment';

console.log('LOGGER_LEVEL', LOGGER_LEVEL);

const logger = pino({
  level: LOGGER_LEVEL
});

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
