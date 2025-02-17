import { HashRouter, Route, Routes } from 'react-router';
import { DecisionPicker } from '~/pages/decision-picker';
import { ListOfOptions } from '~/pages/list-of-options';
import { Route as RouteUrl } from '~/shared/routes';

export const Router = () => (
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
