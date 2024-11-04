import type { AppOpenAPI } from './type';

import { apiReference } from '@scalar/hono-api-reference';
import packageJSON from '../../package.json' with { type: 'json' };

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Tasks API',
    },
  });

  app.get(
    '/reference',
    apiReference({
      theme: 'kepler',
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
      spec: {
        url: '/doc',
      },
    }),
  );
}
