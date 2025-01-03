import { BrowserRouter, Route, Routes } from 'react-router';
import ListOfOptions from '~/modules/list-of-options/views/list-of-options';
import RouteUrl from './route.enum';

const DecisionPicker = () => 'Decision Picker';

const Router = () => (
  <BrowserRouter>
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
  </BrowserRouter>
);

export default Router;
