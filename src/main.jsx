import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./service/store.js";
import { Provider } from "react-redux";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={<div></div>} persistor={persistor}>
    <App />
    <ToastContainer />
    </PersistGate>
  </Provider>
  </ErrorBoundary>
  </StrictMode>,
)
