import { HashRouter, Route, Routes } from 'react-router';
import DecisionPicker from '~/modules/decision-picker/views/decision-picker';
import ListOfOptions from '~/modules/list-of-options/views/list-of-options';
import RouteUrl from './route.enum';

const Router = () => (
  <HashRouter>
    <Routes>
      <Route
        path={RouteUrl.LIST_OF_OPTION}
        element={<ListOfOptions />}
      />
      <Route
        path={RouteUrl.DECISION_PICKER}
        element={<DecisionPicker />}
      />
    </Routes>
  </HashRouter>
);

export default Router;
