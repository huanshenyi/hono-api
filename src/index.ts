import app from './app';
import env from './env';

const port = Number(env.PORT) || 3000;

export default {
  port: port,
  fetch: app.fetch,
};
