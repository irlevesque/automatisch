import { IGlobalVariable } from '@automatisch/types';

const verifyCredentials = async ($: IGlobalVariable) => {
  await $.http.get('/myself');

  await $.auth.set({
    screenName: $.auth.data.username,
  });
};

export default verifyCredentials;
