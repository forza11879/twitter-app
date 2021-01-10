import { schema } from 'normalizr';
const user = new schema.Entity('byUserId');
export const tweetSchema = new schema.Entity('byTweetId', {
  user: user,
});
