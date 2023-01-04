import { TBeforeRequest } from '@automatisch/types';

const addAuthHeader: TBeforeRequest = ($, requestConfig) => {
  if ($.auth.data?.apiToken && $.auth.data?.username) {
    const authstr = Buffer.from(`${$.auth.data.username}:${$.auth.data.apiToken}`, 'binary').toString('base64');

    const authorizationHeader = `Basic ` + authstr;
    requestConfig.headers.Authorization = authorizationHeader;
  }

  return requestConfig;
};

export default addAuthHeader;
