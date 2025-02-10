import { pinoLogger } from '@/middlewares/pino-logger';
import { getAuth, oidcAuthMiddleware, processOAuthCallback, revokeSession } from '@hono/oidc-auth';
import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';
import type { AppBindings, AppOpenAPI } from './type';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon('📖'));
  app.use(pinoLogger());
  app.get('/logout', async (c) => {
    await revokeSession(c);
    return c.text('You have been successfully logged out!');
  });
  app.get('/callback', async (c) => {
    return processOAuthCallback(c);
  });
  app.use('*', oidcAuthMiddleware());
  app.get('/auth', async (c) => {
    const auth = await getAuth(c);
    console.log(auth);
    return c.text(`Hello <${auth?.email}>!`);
  });

  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp(router: AppOpenAPI) {
  const testApp = createApp();
  testApp.route('/', router);
  return testApp;
}
