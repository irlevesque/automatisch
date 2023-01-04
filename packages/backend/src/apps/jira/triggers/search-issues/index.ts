import defineTrigger from '../../../../helpers/define-trigger';
import searchIssues from './search-issues';

export default defineTrigger({
  name: 'Search Issues',
  key: 'searchIssues',
  pollInterval: 1,
  description: 'Triggers when new Issues(s) are found',
  arguments: [
    {
      label: 'JQL',
      key: 'jql',
      type: 'string' as const,
      required: false,
      description:
        'JQL query. Example: "assignee IN (currentUser())"',
      variables: false,
    },
  ],

  async run($) {
    await searchIssues($);
  },
});
