import { AuthMode } from '@algolia/auth';
import { BrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { InMemoryCache } from '@algolia/cache-in-memory';
import { ConsoleLogger } from '@algolia/logger-console';
import { LogLevel } from '@algolia/logger-types';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { UserAgent } from '@algolia/transporter';

import { createSearchClient } from '../presets/lite';
import { AlgoliaSearchOptions } from '../types/AlgoliaSearchOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function algoliasearch(
  appId: string,
  apiKey: string,
  options: AlgoliaSearchOptions = {}
) {
  return createSearchClient({
    appId,
    apiKey,
    requester: createBrowserXhrRequester(),
    timeouts: {
      read: 1,
      write: 30,
    },
    logger: new ConsoleLogger(options.logLevel === undefined ? LogLevel.Error : options.logLevel),
    responsesCache: new InMemoryCache(),
    requestsCache: new InMemoryCache(),
    hostsCache: new BrowserLocalStorageCache(),
    userAgent: UserAgent.create('4.0.0-alpha.0').with({ segment: 'Browser', version: 'lite' }),
    authMode: AuthMode.WithinQueryParameters,
  });
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;