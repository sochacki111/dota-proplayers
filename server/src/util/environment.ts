export const ENVIRONMENT = process.env.NODE_ENV;

const prod = ENVIRONMENT === 'production';
export const LOGGER_LEVEL = prod ? 'error' : 'debug';
