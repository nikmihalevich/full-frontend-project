import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import isomorphicFetch from 'isomorphic-fetch';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const rtkApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: __API__,
		fetchFn: isomorphicFetch,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
			if (token) {
				headers.set('Authorization', token);
			}
			return headers;
		},
	}),
	endpoints: (build) => ({}),
});
