import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { appGlobalState, appGlobalStateContext } from '../GlobalState';
import { AppRepository } from '../AppRepository';
import Departments from './Pages/Departments/Departments';
import Home from './Pages/Home/Home';
import Employees from './Pages/Employees/Employees';


interface IRoutingAndContextAppProps {
  context: WebPartContext;
}
const Crud: React.FC<IRoutingAndContextAppProps> = ({ context }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    appGlobalState.appRepository = new AppRepository(context);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div dir='ltr'>
      <appGlobalStateContext.Provider value={appGlobalState}>
        <HashRouter >
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
        </HashRouter>
      </appGlobalStateContext.Provider>
    </div>
  );
};
export default Crud;