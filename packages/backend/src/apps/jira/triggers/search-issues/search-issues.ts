import { IGlobalVariable } from '@automatisch/types';

const searchIssues = async ($: IGlobalVariable) => {

  let requestPath = `/search`;

  requestPath += '?jql=' + ($.step.parameters.jql as string).trim() + ' ORDER BY created DESC';

  const response = await $.http.get(requestPath);

  for (const issue of response.data.issues) {
    $.pushTriggerItem({
      raw: issue,
      meta:{
        internalId: issue.id as string,
      }
    });
  }
};


export default searchIssues;
