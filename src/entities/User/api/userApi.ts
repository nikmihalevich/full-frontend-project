import { rtkApi } from '@/shared/api/rtkApi';

import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

interface setJsonSettingsArg {
	userId: string;
	jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		setJsonSettings: build.mutation<User, setJsonSettingsArg>({
			query: ({ userId, jsonSettings }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: {
					jsonSettings,
				},
			}),
		}),
	}),
});

export const setJsonSettingsMutation =
	userApi.endpoints.setJsonSettings.initiate;
