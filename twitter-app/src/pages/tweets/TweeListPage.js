import { Provider } from 'react-redux';
import configureAppStore from '../../store/configureAppStore.js';
import TweetList from '../../components/TweetList.component.jsx';
import tweetSagas from '../../saga/tweet.js';

const store = configureAppStore();
// store.runSaga(tweetSagas);

function TweetListPage() {
  return (
    <Provider store={store}>
      <TweetList />
    </Provider>
  );
}

export default TweetListPage;
