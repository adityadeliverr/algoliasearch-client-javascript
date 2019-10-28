import { AuthMode, createAuth } from '@algolia/auth';
import { ComposableOptions, compose } from '@algolia/support';
import { Call, Transporter, TransporterOptions } from '@algolia/transporter';
import { TransporterAware } from '@algolia/transporter/src/TransporterAware';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createAnalyticsClient = <TClient>(
  options: AnalyticsClientOptions & TransporterOptions & ComposableOptions
) => {
  const region = options.region !== undefined ? options.region : 'us';
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);

  const transporter = new Transporter(options);

  transporter.setHosts([{ url: `analytics.${region}.algolia.com`, accept: Call.Any }]);
  transporter.addHeaders({
    ...auth.headers(),
    ...{ 'content-type': 'application/json' },
  });
  transporter.addQueryParameters(auth.queryParameters());

  return compose<TClient & TransporterAware>(
    { transporter },
    options
  );
};

type AnalyticsClientOptions = {
  readonly appId: string;
  readonly apiKey: string;
  readonly region?: string;
};