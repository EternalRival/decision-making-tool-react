import { Provider } from 'react-redux';
import Router from './router';
import store from './core/store/store';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
