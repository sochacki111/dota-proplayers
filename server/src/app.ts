import express, { Application } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/user.routes';

// Create a new express app instance
const app: Application = express();

// Middlewares
app.use(cors());
app.use(passport.initialize());
app.use(morgan('dev'));

// Passport configuration
// passport.use(JwtStrategy);

// Express configuration
declare global {
  namespace Express {
    interface User {
      _id: string;
      email: string;
      swapiHeroId: string;
    }
  }
}

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Swagger

// Routes
app.use('/user', userRoutes);
app.get('/', (req, res) => {
  res.send('Hello world!');
});
export default app;
