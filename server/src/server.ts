import { Server } from 'http';
import logger from './config/logger';
import app from './app';
import mongoose from 'mongoose';
import { MONGODB_URI } from './util/secrets';
import axios from './util/axios-opendota';
import { client, zrange } from './config/redis';
import ProPlayer from './interfaces/proplayer.interface';
// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.debug('DB connected!');
  })
  .catch((err) => {
    logger.fatal(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    process.exit();
  });

const delay = (milliseconds: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(milliseconds);
      console.log(milliseconds);
      console.log('hello');
    }, milliseconds);
  });
};

const server: Server = app.listen(app.get('port'), async () => {
  const { data } = await axios.get('/proplayers');
  await Promise.all(
    data.map(async(player: ProPlayer) => {
      await delay(10000);
      return client.zadd(
        'proplayers',
        player.account_id,
        JSON.stringify(player)
      );
    })
  );
  // for await (const player of data) {
  //   client.zadd('proplayers', player.account_id, JSON.stringify(player));
  //   await delay(1000);
  // }
  console.log('hello');
  logger.debug(`App is listening on port ${app.get('port')}!`);
});

export default server;
