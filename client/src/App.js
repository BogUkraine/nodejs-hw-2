import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';

import useRoutes from './routes';

function App() {
  const routes = useRoutes(false);
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}

export default App;
