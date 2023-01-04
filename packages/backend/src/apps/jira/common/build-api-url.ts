import { TBeforeRequest } from '@automatisch/types';

const buildApiUrl: TBeforeRequest = ($, requestConfig) => {
  if ($.auth.data?.subdomain) {
      requestConfig.baseURL = `https://${$.auth.data.subdomain}.atlassian.net/rest/api/3` as string;
  }

  return requestConfig;
};

export default buildApiUrl;
