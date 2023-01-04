import verifyCredentials from './verify-credentials';
import isStillVerified from './is-still-verified';

export default {
  fields: [
    {
      key: 'subdomain',
      label: 'Atlassian Subdomain',
      type: 'string' as const,
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description:
        'Your Atlassian cloud account subdomain (i.e., <yourdomain>.atlassian.net)',
      clickToCopy: false,
    },
    {
      key: 'apiToken',
      label: 'API Token',
      type: 'string' as const,
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description:
        'Your Atlassian account API token. See https://id.atlassian.com/manage-profile/security/api-tokens',
      clickToCopy: false,
    },
    {
      key: 'username',
      label: 'Username',
      type: 'string' as const,
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description:
        'Username (email) of your Atlassian account.',
      clickToCopy: false,
    },
  ],

  verifyCredentials,
  isStillVerified,
};
