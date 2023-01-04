import defineAction from '../../../../helpers/define-action';

export default defineAction({
  name: 'Create Issue',
  key: 'createIssue',
  description: 'Creates an Issue in Jira',
  arguments: [
    {
      label: 'TBD',
      key: 'tbd',
      type: 'string' as const,
      required: false,
      description:
        'TBD.',
      variables: false,
      value: null
    },
  ],

  async run($) {
    const requestPath = `/TBD`;
    const {
      projectId,
      sectionId,
      labels,
      content,
      description
    } = $.step.parameters;

    const payload = {
      content,
      description: description || null,
      project_id: projectId || null,
      labels: labels || null,
      section_id: sectionId || null,
    }

    const response = await $.http.post(requestPath, payload);

    $.setActionItem({ raw: response.data });
  },
});
