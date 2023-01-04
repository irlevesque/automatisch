import defineApp from '../../helpers/define-app';
import buildApiUrl from './common/build-api-url';
import addAuthHeader from './common/add-auth-header';
import auth from './auth';
import triggers from './triggers';
import actions from './actions';

export default defineApp({
  name: 'Jira',
  key: 'jira',
  iconUrl: '{BASE_URL}/apps/jira/assets/favicon.svg',
  authDocUrl: 'https://automatisch.io/docs/apps/jira/connection',
  supportsConnections: true,
  baseUrl: 'https://atlassian.net',
  apiBaseUrl: '',
  primaryColor: 'e1000f',
  beforeRequest: [buildApiUrl,addAuthHeader],
  auth,
  triggers,
  actions,
});
