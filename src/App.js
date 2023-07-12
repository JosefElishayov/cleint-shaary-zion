import './App.css';
import React, { } from 'react';
import { ContextProvider } from './context/myContext';
import AppRoutes from './appRoutes';
import { Alert, ConfigProvider } from 'antd';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AlertForAll from './alertForAll';
function App() {


  return (
    <PayPalScriptProvider options={{ clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID, currency: "ILS" }}>
    
      <ContextProvider>
        <ConfigProvider direction='rtl'>
          <AlertForAll />
          <AppRoutes />
        </ConfigProvider>
      </ContextProvider>
    </PayPalScriptProvider>
  );
}
export default App;
