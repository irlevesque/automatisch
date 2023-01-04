import defineAction from '../../../../helpers/define-action';

export default defineAction({
  name: 'Create Issue',
  key: 'createIssue',
  description: 'Creates an Issue in Jira',
  arguments: [
    {
      label: 'Summary',
      key: 'summary',
      type: 'string' as const,
      required: false,
      description:
        'Summary of Issue.',
      variables: true,
    },
    {
      label: 'Description',
      key: 'description',
      type: 'string' as const,
      required: false,
      description:
        'Description of Issue.',
      variables: true,
    },
    {
      label: 'Labels',
      key: 'labels',
      type: 'string' as const,
      required: false,
      description:
        'Labels to associate with Issue. Comma separated.',
      variables: true,
    },
    {
      label: 'Project Key',
      key: 'projectKey',
      type: 'string' as const,
      required: false,
      description:
        'Project Key (name)',
      variables: true,
    },
    {
      label: 'Reporter ID',
      key: 'reporterId',
      type: 'string' as const,
      required: false,
      description:
        'Reporter ID',
      variables: true,
    },
    {
      label: 'Assignee ID',
      key: 'assigneeId',
      type: 'string' as const,
      required: false,
      description:
        'Assignee ID',
      variables: true,
    },
  ],

  async run($) {
    const requestPath = `/issue`;
    const {
      summary,
      description,
      projectKey,
      reporterId,
      assigneeId,
      labels
    } = $.step.parameters;

    const labelsArray = `${labels}`.split(',')

    const payload = {
      fields: {
        summary: summary,
        project: {key: projectKey},
        description: description,
        labels: labelsArray || null,
        reporter: {id: reporterId},
        assignee: {id: assigneeId},
      },
    }

    const response = await $.http.post(requestPath, payload);

    $.setActionItem({ raw: response.data });
  },
});
