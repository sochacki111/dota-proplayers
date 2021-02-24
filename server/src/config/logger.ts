import pino from 'pino';
import { LOGGER_LEVEL } from '../util/environment';

const logger = pino({
  level: LOGGER_LEVEL
});

logger.debug(`Logging initialized at ${LOGGER_LEVEL} level`);

export default logger;
