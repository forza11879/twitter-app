import { Provider } from 'react-redux';
import configureAppStore from '../../store/configureAppStore.js';
import TweetList from '../../components/TweetList';

const store = configureAppStore();

function TweetListPage() {
  return (
    <Provider store={store}>
      <TweetList />
    </Provider>
  );
}

export default TweetListPage;
