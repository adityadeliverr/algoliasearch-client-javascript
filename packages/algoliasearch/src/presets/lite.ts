import { createSearchClient as baseCreateSearchClient } from '@algolia/search-client';
import { SearchClientOptions } from '@algolia/search-client/src/createSearchClient';
import { initIndex } from '@algolia/search-client/src/methods/client/initIndex';
import {
  HasMultipleQueries,
  multipleQueries,
} from '@algolia/search-client/src/methods/client/multipleQueries';
import {
  HasMultipleSearchForFacetValues,
  multipleSearchForFacetValues,
} from '@algolia/search-client/src/methods/client/multipleSearchForFacetValues';
import { HasSearch, search } from '@algolia/search-client/src/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '@algolia/search-client/src/methods/index/searchForFacetValues';
import { TransporterOptions } from '@algolia/transporter';

export type SearchClient = HasMultipleQueries & HasMultipleSearchForFacetValues;

export type SearchIndex = HasSearch & HasSearchForFacetValues;

export const methods = {
  searchClient: [multipleQueries, multipleSearchForFacetValues],
  searchIndex: [search, searchForFacetValues],
};

// eslint-disable-next-line
export const createSearchClient = (options: SearchClientOptions & TransporterOptions) => {
  const base = baseCreateSearchClient<SearchClient>({ ...options, methods: methods.searchClient });

  return {
    ...base,
    initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
      return initIndex(this).initIndex(indexName, {
        methods: methods.searchIndex,
      });
    },
  };
};