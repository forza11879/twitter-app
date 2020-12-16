import { schema } from 'normalizr';
// const tweet = new schema.Entity('users', {}, { idAttribute: 'id' });
// const user = new schema.Entity('user', {}, { idAttribute: 'id' });
const user = new schema.Entity('byUserId');
export const tweetSchema = new schema.Entity('byTweetId', {
  user: user,
});
