import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const notify = (type) => {
  switch (type) {
    case 'pause':
      toast.success('Fetch request Paused');
      break;
    case 'search':
      toast.success('Search request was sent');
      break;
    default:
      console.log(`Sorry, we are out of ${type}.`);
  }
};

export default notify;
